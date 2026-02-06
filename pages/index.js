// pages/index.js
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-100 p-8">
      <h1 className="text-4xl font-bold text-stone-800">
        Earthship Timeline
      </h1>
      <p className="mt-4 text-stone-600">
        Building with earth, one tire at a time.
      </p>
      
      <div className="mt-8">
        <Image 
          src="/images/test.png"
          alt="Test photo"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  )
}