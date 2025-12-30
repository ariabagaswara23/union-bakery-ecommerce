// lib/api/rateLimiter.ts

/**
 * RateLimiter class untuk membatasi jumlah request dalam waktu tertentu
 */
class RateLimiter {
  private queue: Array<() => void> = []
  private requestTimes: number[] = []
  private maxRequests: number
  private timeWindow: number

  constructor(maxRequests: number = 3, timeWindow: number = 1000) {
    this.maxRequests = maxRequests
    this.timeWindow = timeWindow
  }

  /**
   * Throttle function untuk membatasi request
   * @param fn - Function yang akan di-throttle
   * @returns Promise dengan hasil dari function
   */
  async throttle<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const executeRequest = async () => {
        const now = Date.now()
        
        // Hapus timestamp yang sudah lewat dari time window
        this.requestTimes = this.requestTimes.filter(
          time => now - time < this.timeWindow
        )

        // Cek apakah masih ada slot untuk request
        if (this.requestTimes.length < this.maxRequests) {
          this.requestTimes.push(now)
          try {
            const result = await fn()
            resolve(result)
          } catch (error) {
            reject(error)
          }
          // Process queue setelah request selesai
          this.processQueue()
        } else {
          // Tunggu sampai slot tersedia
          const oldestRequest = this.requestTimes[0]
          const waitTime = this.timeWindow - (now - oldestRequest)
          
          setTimeout(() => {
            executeRequest()
          }, waitTime + 10) // +10ms untuk safety margin
        }
      }

      executeRequest()
    })
  }

  /**
   * Process antrian request yang tertunda
   */
  private processQueue() {
    if (this.queue.length > 0) {
      const next = this.queue.shift()
      if (next) next()
    }
  }

  /**
   * Reset rate limiter (hapus semua request history)
   */
  reset() {
    this.requestTimes = []
    this.queue = []
  }

  /**
   * Get current status
   */
  getStatus() {
    return {
      currentRequests: this.requestTimes.length,
      maxRequests: this.maxRequests,
      queueLength: this.queue.length,
      timeWindow: this.timeWindow,
    }
  }
}

/**
 * RateLimiterManager untuk mengelola multiple rate limiters
 * Berguna kalau setiap endpoint punya rate limit berbeda
 */
class RateLimiterManager {
  private limiters = new Map<string, RateLimiter>()

  /**
   * Get atau create rate limiter untuk key tertentu
   * @param key - Identifier untuk rate limiter (misal: 'products', 'cart')
   * @param maxRequests - Jumlah maksimal request (default: 3)
   * @param timeWindow - Time window dalam ms (default: 1000)
   * @returns RateLimiter instance
   */
  getLimiter(
    key: string, 
    maxRequests: number = 3, 
    timeWindow: number = 1000
  ): RateLimiter {
    if (!this.limiters.has(key)) {
      const limiter = new RateLimiter(maxRequests, timeWindow)
      this.limiters.set(key, limiter)
    }
    return this.limiters.get(key)!
  }

  /**
   * Reset specific rate limiter
   */
  resetLimiter(key: string) {
    const limiter = this.limiters.get(key)
    if (limiter) {
      limiter.reset()
    }
  }

  /**
   * Reset semua rate limiters
   */
  resetAll() {
    this.limiters.forEach(limiter => limiter.reset())
  }

  /**
   * Get status semua rate limiters
   */
  getAllStatus() {
    const status: Record<string, any> = {}
    this.limiters.forEach((limiter, key) => {
      status[key] = limiter.getStatus()
    })
    return status
  }

  /**
   * Remove rate limiter
   */
  removeLimiter(key: string) {
    this.limiters.delete(key)
  }
}

// Export singleton instance
export const rateLimiterManager = new RateLimiterManager()

// Export untuk backward compatibility (kalau mau pakai satu global limiter)
export const apiRateLimiter = rateLimiterManager.getLimiter('global', 3, 1000)