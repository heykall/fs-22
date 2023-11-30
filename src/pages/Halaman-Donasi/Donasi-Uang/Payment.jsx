import React, { useState } from "react";
import axios from "axios";

const Payment = () => {
  // State untuk menyimpan data formulir
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    donation_amount: "",
    note: "",
  });

  // Fungsi untuk meng-handle perubahan nilai pada input formulir
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi untuk menetapkan jumlah donasi berdasarkan tombol nominal yang ditentukan
  const handlePredefinedAmount = (amount) => {
    setFormData({ ...formData, donation_amount: amount.toString() });
  };

  // Fungsi yang dipanggil saat formulir dikirimkan
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi jumlah donasi minimal
    if (parseInt(formData.donation_amount, 10) < 10000) {
      alert(
        "Maaf, minimal donasi adalah Rp 10,000. Mohon ditambah ya, terima kasih. 😊"
      );
      return;
    }

    try {
      // Kirim permintaan ke server untuk memulai transaksi Midtrans
      const response = await axios.post(
        "https://rich-eel-blazer.cyclic.apptransactions",
        formData
      );
      console.log("Midtrans Response:", response.data);

      // Redirect ke halaman pembayaran Midtrans
      window.location.href = response.data.data.redirect_url;
    } catch (error) {
      console.error("Error initiating Midtrans transaction:", error.message);
      // Tangani error di antarmuka pengguna, misalnya, tampilkan pesan error kepada pengguna
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Judul halaman */}
          <h3 className="text-center mb-4">
            Berikan harapan dengan donasi uang
          </h3>

          {/* Formulir donasi */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-center">
              {/* Input jumlah donasi */}
              <label className="form-label">
                <h4>Masukkan nominal donasi</h4>
                <input
                  type="number"
                  name="donation_amount"
                  value={formData.donation_amount}
                  onChange={handleChange}
                  placeholder="Rp"
                  className="form-control mt-2"
                />
                {/* Pesan bantuan untuk jumlah donasi */}
                <div id="passwordHelpBlock" className="form-text text-danger">
                  Mohon isi Rp 10.000 atau lebih
                </div>
              </label>

              {/* Tombol-tombol nominal donasi */}
              <div className="row justify-content-center">
                <button
                  type="button"
                  className="btn btn-outline-dark btn-bold col-3 m-1"
                  onClick={() => handlePredefinedAmount(10000)}
                >
                  Rp 10,000
                </button>
                <button
                  type="button"
                  className="btn btn-outline-dark btn-bold col-3 m-1"
                  onClick={() => handlePredefinedAmount(20000)}
                >
                  Rp 20,000
                </button>
                <button
                  type="button"
                  className="btn btn-outline-dark btn-bold col-3 m-1"
                  onClick={() => handlePredefinedAmount(50000)}
                >
                  Rp 50,000
                </button>
              </div>
              <div className="row justify-content-center mt-2">
                <button
                  type="button"
                  className="btn btn-outline-dark btn-bold col-3 m-1"
                  onClick={() => handlePredefinedAmount(100000)}
                >
                  Rp 100,000
                </button>
                <button
                  type="button"
                  className="btn btn-outline-dark btn-bold col-3 m-1"
                  onClick={() => handlePredefinedAmount(200000)}
                >
                  Rp 200,000
                </button>
                <button
                  type="button"
                  className="btn btn-outline-dark btn-bold col-3 m-1"
                  onClick={() => handlePredefinedAmount(500000)}
                >
                  Rp 500,000
                </button>
              </div>
            </div>

            {/* Bagian Data Diri */}
            <h4 className="mb-4 text-center">Data Diri</h4>
            <div className="mb-3">
              {/* Input Nama Lengkap */}
              <label className="form-label">
                Nama Lengkap
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="form-control"
                  style={{ width: "100%" }}
                />
              </label>
            </div>

            <div className="mb-3">
              {/* Input Email */}
              <label className="form-label">
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </label>
            </div>

            <div className="mb-3">
              {/* Input Nomor Telepon */}
              <label className="form-label">
                Phone
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                />
              </label>
            </div>

            <div className="mb-3">
              {/* Input Catatan (Opsional) */}
              <label className="form-label">
                Catatan (Opsional)
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  className="form-control"
                ></textarea>
              </label>
            </div>

            {/* Tombol Submit */}
            <div className="row mt-4">
              <div className="col-12 text-center">
                <button
                  type="submit"
                  className="btn btn-light rounded-pill px-5"
                  style={{ backgroundColor: "#29AB92" }}
                >
                  Lanjutkan Donasi
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
