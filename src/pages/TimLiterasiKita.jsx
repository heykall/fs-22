import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import styles from "./TimLiterasiKita.module.css";
import literasi1 from "../assets/svg/literasi1.svg";
import literasi2 from "../assets/svg/literasi2.svg";
import ade from "../assets/svg/ade.svg";
import instagram from "../assets/svg/iconInstagram.svg";
import github from "../assets/svg/iconGithub.svg";
import twitter from "../assets/svg/iconTwitter.svg";

const TeamLiterasiKita = () => {
  return (
    <>
      <section className={styles.bgSection1}>
        <Container>
          <br />
          <br />
          <br />
          <h1 className="text-center">Tim Kami</h1>
          <Row className="justify-content-center mt-5">
            {/* Team Member 1 */}
            <Col lg={4} md={6} className="mb-4 mb-lg-0">
              <div className={styles.teamThumb}>
                <Image src={ade} className={styles.aboutImage} alt="" />
                <did className={styles.teamInfo}>
                  <h4 className="mb-2">Muhamad Nur Syami</h4>
                  <p>Tanjungpinang, Kepulauan Riau</p>
                  <div className={styles.socialShare}>
                    <ul className={styles.socialIcon}>
                      <li className={styles.socialIconItem}>
                        <a href="#" className={styles.socialIconLink}>
                          <Image src={instagram} alt="" />
                        </a>
                      </li>
                      <li className={styles.socialIconItem}>
                        <a href="#" className={styles.socialIconLink}>
                          <Image src={github} alt="" />
                        </a>
                      </li>
                      <li className={styles.socialIconItem}>
                        <a href="#" className={styles.socialIconLink}>
                          <Image src={twitter} alt="" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </did>
              </div>
            </Col>

            {/* Team Member 2 */}
            <Col lg={4} md={6} className="mb-4 mb-lg-0">
              <div className={styles.teamThumb}>
                <Image src={ade} className={styles.aboutImage} alt="" />
                <div className={styles.teamInfo}>
                  <h4 className="mb-2">Ade Pertiwi</h4>
                  <p>Denpasar, Bali</p>
                  <div className={styles.socialShare}>
                    <ul className={styles.socialIcon}>
                      <li className={styles.socialIconItem}>
                        <a
                          href="https://www.instagram.com/adepxrtwi/"
                          className={styles.socialIconLink}
                        >
                          <Image src={instagram} alt="" />
                        </a>
                      </li>
                      <li className={styles.socialIconItem}>
                        <a
                          href="https://github.com/adepertiwi"
                          className={styles.socialIconLink}
                        >
                          <Image src={github} alt="" />
                        </a>
                      </li>
                      <li className={styles.socialIconItem}>
                        <a
                          href="https://twitter.com/adprtwi"
                          className={styles.socialIconLink}
                        >
                          <Image src={twitter} alt="" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Col>

            {/* Team Member 3 */}
            <Col lg={4} md={6} className="mb-4 mb-lg-0">
              <div className={styles.teamThumb}>
                <Image src={ade} className={styles.aboutImage} alt="" />
                <div className={styles.teamInfo}>
                  <h4 className="mb-2">Dedy Lumbantobing</h4>
                  <p>Medan, Sumatera Utara</p>
                  <div className={styles.socialShare}>
                    <ul className={styles.socialIcon}>
                      <li className={styles.socialIconItem}>
                        <a href="#" className={styles.socialIconLink}>
                          <Image src={instagram} alt="" />
                        </a>
                      </li>
                      <li className={styles.socialIconItem}>
                        <a href="#" className={styles.socialIconLink}>
                          <Image src={github} alt="" />
                        </a>
                      </li>
                      <li className={styles.socialIconItem}>
                        <a href="#" className={styles.socialIconLink}>
                          <Image src={twitter} alt="" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <br />
      <br />
      <br />
      <br />
      <br />
      <section className={styles.bgSection2}>
        <Container className="mt-5">
          <Row>
            <Col lg={12} className="mx-auto">
              <div className="d-flex flex-column flex-md-row align-items-center">
                <div className="p-3 text-center text-md-left">
                  <h1>Visi</h1>
                  <p>
                    "Menjadi jembatan akses literasi bagi anak-anak Indonesia,
                    menciptakan generasi yang gemar membaca, kreatif, dan siap
                    menghadapi tantangan masa depan."
                  </p>
                </div>
                <div className="p-3">
                  <Image
                    src={literasi1}
                    className="w-100 rounded-4 img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <Container className="mb-5">
          <Row>
            <Col lg={12} className="mx-auto">
              <div className="d-flex flex-column flex-md-row align-items-center">
                <div className="p-5">
                  <Image
                    src={literasi2}
                    className="w-100 rounded-4 img-fluid"
                    alt=""
                  />
                </div>
                <div className="p-5 text-md-left">
                  <h1 className="text-center mb-2">Misi</h1>
                  <ul className={styles.misiList}>
                    <li className={styles.textJustify}>
                      <b>Menghadirkan Akses Literasi:</b>
                      <br />
                      Menyediakan buku digital dan video pembelajaran dengan
                      mudah, memastikan setiap anak memiliki akses ke bahan
                      bacaan berkualitas, tanpa batasan geografis.
                    </li>
                    <li className={styles.textJustify}>
                      <b>Membangun Minat dan Keterlibatan:</b>
                      <br />
                      Mendorong minat dan keterlibatan anak-anak dalam proses
                      pembelajaran melalui program edukatif yang menarik dan
                      interaktif.
                    </li>
                    <li className={styles.textJustify}>
                      <b>Menyadarkan Pentingnya Literasi:</b>
                      <br />
                      Edukasi masyarakat akan manfaat literasi, membaca, dan
                      pembelajaran, serta bagaimana kontribusi positif ini dapat
                      membentuk perkembangan generasi muda.
                    </li>
                  </ul>
                </div>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default TeamLiterasiKita;
