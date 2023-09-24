'use client'
import GosendOption from "@/components/gosendOption/page"
import OrderFooter from "@/components/orderFooter/orderFooter"
import PickupOption from "@/components/pickupOption/page"
import { useOpsiPengambilan } from "@/utils/store"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const opsiPengambilan = useOpsiPengambilan((state) => state.opsiPengambilan)
    function displayModal() {
        if (opsiPengambilan === "pick-up") {
            return <PickupOption/>
        }else if(opsiPengambilan === "gosend") {
            return <GosendOption/>
        }else {
            return <div><p>Pilih opsi pengambilan</p></div>
        }
    }
    return <div>
        {children}
        <br></br>
        {displayModal()}
        </div>
  }