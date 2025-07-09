import React, { useEffect, useState } from 'react';
import './css-all-project.css';
import { Carousel, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropertyCardTemplate from '../../PropertyCard/PropertyCardTemplate';


const BASE_URL = process.env.REACT_APP_API_URL;


const NearByProject = () => {
    const [chunked, setChunked] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/properties`) // Update if backend URL changes
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(item => item.project_type === 1);
                const chunks = [];
                for (let i = 0; i < filtered.length; i += 3) {
                    chunks.push(filtered.slice(i, i + 3));
                }
                setChunked(chunks);
            })
            .catch(err => console.error("Error fetching properties:", err));
    }, []);

    return (
        <div className='near-by-project-container' style={{width:'100%' }}>
            <div className=' near-by-project-box' style={{width:'100%' }}>
                <Carousel controls={chunked.length > 1} indicators={false} interval={6000} style={{ }}>
                    {chunked.map((group, idx) => (
                        <Carousel.Item key={idx} style={{}}>
                            <Container className="mt-2 stickerback">
                                <Row>
                                    {group.map((property, i) => (
                                        <Col key={i} xs={12} sm={4} >
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

export default NearByProject;
