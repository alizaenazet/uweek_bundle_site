
const { ObjectId } = require('mongodb');

const tes = {
    _id:  new ObjectId(0o123123423),
    nama_lengkap: "ali zaenal",
    nim: 21343,
    nama_kelompok: "marenge",
    no_kelompok: 0,
    jurusan: "informatics",
    total: 30000,
    status: "pending",
    created_at: new Date(),
    opsi_pengambilan: {
        opsi: "gosend",
        tempatPengambilan: "kopte",
        waktu: new Date()
    }
}

console.log(JSON.stringify(tes));
