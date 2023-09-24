
import { orderInfo, pilihanOpsiPengambilan } from "@/types/types";
import { stringify } from "querystring";
import { create } from "zustand";



interface OrderState {
    userOrderInfo: orderInfo
    insertOrder: (orderInfo: orderInfo) => void 
} 


interface OpsiPengambilanState {
    opsiPengambilan : "pick-up" | "gosend" | ""
    setPengambilan : (opsi: "pick-up" | "gosend" | "") => void;
}

export const useOrderStore = create<OrderState>()((set) => ({
    userOrderInfo: {
        namaLengkap: "",
        NIM: "",
        namaKelompok: "",
        noKelompok: 0,
        jurusan: "",
        image: undefined,
        idLine: ""
    },
     insertOrder: (userInfo) => {

     set({userOrderInfo : userInfo});
    }
}))

export const useOpsiPengambilan = create<OpsiPengambilanState>()((set)=>({
    opsiPengambilan : "",
    setPengambilan(opsi) {
        set({opsiPengambilan : opsi})
    },
}) )

module.exports = {useOpsiPengambilan, useOrderStore}