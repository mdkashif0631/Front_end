import React, { useEffect, useState } from 'react';
import './css-all-project.css';
import { Carousel, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropertyCardTemplate from '../../PropertyCard/PropertyCardTemplate';

const BASE_URL = process.env.REACT_APP_API_URL;

const LuxuryProject = () => {
    const [chunked, setChunked] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/properties`) // Update if backend URL changes
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(item => item.Project_type === "Residential");
                const chunks = [];
                for (let i = 0; i < filtered.length; i += 4) {
                    chunks.push(filtered.slice(i, i + 4));
                }
                setChunked(chunks);
            })
            .catch(err => console.error("Error fetching properties:", err));
    }, []);

    return (
        <div className='project-container'>
            <div className='project-box'>
                <div className='project-header'>
                    <h2>LUXURY PROJECT</h2>
                </div>
                <Carousel controls={chunked.length > 1} indicators={false} interval={6000}>
                    {chunked.map((group, idx) => (
                        <Carousel.Item key={idx}>
                            <Container className="my-1 stickerback p-4">
                                <Row>
                                    {group.map((property, i) => (
                                        <Col key={i} xs={12} sm={6} md={3}>
                                            <PropertyCardTemplate property={property} />
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default LuxuryProject;