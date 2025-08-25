import mongoose from 'mongoose'
import type { Mongoose } from 'mongoose'

declare global {
  var __mongooseConn__: { conn: Mongoose | null; promise: Promise<Mongoose> | null } | undefined
}

let cached = global.__mongooseConn__
if (!cached) {
  cached = global.__mongooseConn__ = { conn: null, promise: null }
}

export async function dbConnect(): Promise<Mongoose> {
  if (cached!.conn) return cached!.conn
  if (!cached!.promise) {
    const uri = process.env.MONGODB_URI
    if (!uri) throw new Error('MONGODB_URI is not defined')
    cached!.promise = mongoose.connect(uri, { dbName: 'yerevan-culinary' })
  }
  cached!.conn = await cached!.promise
  return cached!.conn
}
