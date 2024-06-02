import { useState } from "react";
import contactImg from '../assets/img/contact-img.svg';
import { Container, Row, Col } from "react-bootstrap";

function Contact() {
    const formInitialDetails = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    }

    const [formDetail, setFormDetail] = useState(formInitialDetails);
    const [status, setStatus] = useState({});

    const onFormUpdate = (category, value) => {
        setFormDetail({
            ...formDetail,
            [category]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response = await fetch("http://localhost:5001/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(formDetail),
        })
        let result = response.json();
        setFormDetail(formDetail);
        if(result.code === 200) {
            setStatus({ success: true, message: "Message sent successfully"})
        } 
        // else {
        //     setStatus({ success: false, message: "Something went wrong, please try again later."})
        // }
    }


    return (
        <section className="contact" id="connect">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <img src={contactImg} alt="Contact Us" />
                    </Col>
                    <Col md={6}>
                        <h2>Get In Touch</h2>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col sm={6} className="px-1">
                                    <input type="text" value={formDetail.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                                </Col>
                                <Col sm={6} className="px-1">
                                <input type="text" value={formDetail.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)} />
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input type="email" value={formDetail.email} placeholder="Email" onChange={(e) => onFormUpdate('email', e.target.value)} />
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input type="tel" value={formDetail.phone} placeholder="Phone" onChange={(e) => onFormUpdate('phone', e.target.value)} />
                                </Col>
                                <Col>
                                    <textarea rows="6" type="message" value={formDetail.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)} />
                                    <button type="submit"><span>Send</span></button>
                                </Col>
                                {
                                    status.message &&
                                    <Col>
                                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                                    </Col>
                                }
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>

        </section>
    )
}

export { Contact };