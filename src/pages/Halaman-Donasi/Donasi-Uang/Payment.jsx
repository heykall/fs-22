import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";

const Payment = () => {
  const dataLocalStorage = localStorage.getItem("data");
  const userData = JSON.parse(dataLocalStorage);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    donation_amount: "",
    note: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePredefinedAmount = (amount) => {
    setFormData({ ...formData, donation_amount: amount.toString() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(formData.donation_amount, 10) < 10000) {
      alert(
        "Maaf, minimal donasi adalah Rp 10,000. Mohon ditambah ya, terima kasih. 😊"
      );
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/donasi/donasiuang/${userData._id}`,
        {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          donation_amount: formData.donation_amount,
          note: formData.note,
        }
      );

      console.log("Midtrans Response:", response.data);

      if (window.snap && window.snap.pay) {
        window.snap.pay(response.data.data.token);
      } else {
        alert(
          "Maaf, terjadi kesalahan saat mencoba melakukan transaksi. Silakan coba lagi nanti."
        );
      }
    } catch (error) {
      console.error("Error initiating Midtrans transaction:", error.message);
      alert(
        "Maaf, terjadi kesalahan saat mencoba melakukan transaksi. Silakan coba lagi nanti."
      );
    }
  };

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/transactions/config"
        );
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", response.data.clientKey);

        // Set a flag when the script is loaded
        script.onload = () => {
          window.snapJsLoaded = true;
        };

        document.body.appendChild(script);
      } catch (error) {
        console.error("Error loading Snap.js:", error.message);
      }
    };

    fetchConfig();
  }, []);

  return (
    <div className="payment">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h3 className="text-center mb-4">
              Berikan harapan dengan donasi uang
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3 text-center">
                <label htmlFor="donation_amount" className="form-label w-100">
                  <h4>Masukkan nominal donasi</h4>
                  <input
                    type="number"
                    id="donation_amount"
                    name="donation_amount"
                    value={formData.donation_amount}
                    onChange={handleChange}
                    placeholder="Rp"
                    className="form-control mt-2"
                    required
                  />
                  <div id="passwordHelpBlock" className="form-text text-danger">
                    Mohon isi Rp 10.000 atau lebih
                  </div>
                </label>

                <div className="row justify-content-center">
                  {[10000, 20000, 50000, 100000, 200000, 500000].map(
                    (amount) => (
                      <button
                        key={amount}
                        type="button"
                        className="btn btn-outline-dark btn-bold col-3 m-1"
                        onClick={() => handlePredefinedAmount(amount)}
                      >
                        Rp {amount.toLocaleString()}
                      </button>
                    )
                  )}
                </div>
              </div>

              <h4 className="mb-4 text-center">Data Diri</h4>

              {/* Input Nama Lengkap */}
              <div className="mb-3">
                <label htmlFor="full_name" className="form-label w-100">
                  Nama Lengkap
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="form-control"
                    style={{ width: "100%" }}
                    required
                  />
                </label>
              </div>

              {/* Input Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label w-100">
                  Email
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </label>
              </div>

              {/* Input Nomor Telepon */}
              <div className="mb-3">
                <label htmlFor="phone" className="form-label w-100">
                  Phone
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </label>
              </div>

              {/* Input Catatan (Opsional) */}
              <div className="mb-3">
                <label htmlFor="note" className="form-label w-100">
                  Catatan (Opsional)
                  <textarea
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    className="form-control"
                  />
                </label>
              </div>

              {/* Tombol Submit */}
              <div className="row align-items-center mt-5">
                <div className="col-12 col-md-4"></div>
                <div className="col-12 col-md-4 text-center w-100">
                  {/* <button
                  type="submit"
                  className="btn btn-light w-75 text-white rounded-pill shadow px-3 py-2 mb-5"
                  style={{ backgroundColor: "#29AB92" }}
                >
                  Lanjutkan Donasi
                </button> */}
                  <Button
                    type="submit"
                    className="btn btn-light w-75 text-white rounded-pill shadow px-3 py-2 mb-5"
                    style={{ backgroundColor: "#29AB92" }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
                <div className="col-12 col-md-4"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
