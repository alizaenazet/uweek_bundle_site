import { NextResponse } from 'next/server'
import {Client, TravelMode,TravelRestriction } from "@googlemaps/google-maps-services-js";

 
export async function POST(request: Request) {
  const client = new Client();
        
    return NextResponse.json({status:200,jarak: parseFloat("21.01 Km")})
          
  const {destination} = await request.json().catch(() => {
      return NextResponse.json({
          status:403, 
          message:"request body required "
        })
        
    })
    console.log(destination);
    
    

//   if (!destination) {
//     return NextResponse.json({
//         status:403, 
//         message:"Destination not included"
//     })
//   }

  
//       const res = await client.distancematrix({
//             params: {
//                 origins:["Jl. Bangkingan V No.12, Bangkingan, Kec. Lakarsantri, Surabaya, Jawa Timur 61177"],
//                 destinations:[destination],
//                 avoid: [TravelRestriction.tolls],
//                 language:'en',
//                 mode: TravelMode.driving,
//                 region:"id",
//                 // traffic_model : TrafficModel.optimistic,
//                 key: process.env.GMAPS_KEY
//             }
//         })
//         .catch((e) => {
//             return NextResponse.json(e.response.data.error_message)
//         })
        
        
//         return NextResponse.json({
//             status:200,
//             distcInKm:
//             parseFloat(res.data.rows[0].elements[0].distance.text)})
}