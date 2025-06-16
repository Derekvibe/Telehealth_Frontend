import React from 'react'

function HeroT() {
  return (
    <div className='bg-gray-400 p-10'>
      <div className='flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 py-10'>

          <h3 className='text-3xl text-black font-semibold '>We Offer a Wide Range of <br /> Unique Services</h3>
        
          <p className='mt-6'>Journey to better health and wellbeing. Treatment for specific <br /> condition simple looking to improve, <br />and reflects the tone you want to convery to you</p>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-7 px-4">
  <div className="border-black w-full md:w-1/4 p-8 rounded-lg bg-white">
    <h4 className="text-xl font-semibold-black text-black pb-4 tracking-wide">Virtual Construction</h4>
    <p className="text-sm text-black">Virtual consultation services are increasingly popular in the health industry, especially given recent technological.</p>
    <img src="/Images/Consultation.jpg" alt="Ask Doc Consultation" className="pt-4" />
  </div>

  <div className="border-black w-full md:w-1/4 p-8 rounded-lg bg-white">
    <h4 className="text-xl font-semibold-black text-black pb-4 tracking-wide">Make an Appointment</h4>
    <p className="text-sm text-black">Virtual consultation services are increasingly popular in the health industry, especially given recent technological.</p>
    <img src="/Images/OnlineDoc.jpg" alt="Make an Appointment" className="pt-4" />
  </div>

  <div className="border-black w-full md:w-1/4 p-8 rounded-lg bg-white">
    <h4 className="text-xl font-semibold-black text-black pb-4 tracking-wide">Online Pharmacy</h4>
    <p className="text-sm text-black">Virtual consultation services are increasingly popular in the health industry, especially given recent technological.</p>
    <img src="/Images/OnlinePham.jpg" alt="Online Pharmacy" className="pt-4" />
        </div>
</div>


    </div>
  )
}

export default HeroT