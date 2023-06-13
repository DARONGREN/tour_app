import React, { useRef, useContext } from 'react'
import '../styles/tourDetails.css'
import { Container, Row, Col, Form, ListGroup } from 'reactstrap'
import { useParams } from 'react-router-dom'
import TourData from '../assets/data/tours'
import calculateAvgRating from '../utils/avgRating'
import avatar from '../assets/images/avatar.jpg'
import { useState } from 'react'
import Booking from '../components/Booking/Booking'
import Newsletter from '../shared/Newsletter'
import useFetch from '../hooks/userFetch'
import { BASE_URL } from '../utils/config'
import { useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

const TourDetails = () => {
  const { id } = useParams()
  const reviewsMsgRef = useRef('')

  const [tourRating, setTourRating] = useState(null)
  const { user } = useContext(AuthContext)

  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`)
  console.log(tour)
  const {
    photo,
    title,
    desc,
    price,
    reviews,
    address,
    city,
    distance,
    maxGroupSize,
  } = tour

  const { totalRating, avgRating } = calculateAvgRating(reviews)

  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const reviewText = reviewsMsgRef.current.value

    try {
      if (!user || user === undefined || user === null) {
        alert('login')
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating,
      }
      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'omit',
        body: JSON.stringify(reviewObj),
      })
      const result = await res.json()
      if (!res.ok) {
        return alert(result.message + 'result')
      }
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tour])
  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">loading...</h4>}
          {error && <h4 className="text-center pt-5">{error}...</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt="" />
                  <div className="tour__info">
                    <h2>{title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i
                          className="ri-star-fill"
                          style={{ color: 'var(--secondary-color' }}
                        ></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          'not rate'
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>
                      <span>
                        <i className="ri-map-pin-fill">{address}</i>
                      </span>
                    </div>
                    <div className="tour__extra-details">
                      <span>
                        <i className="ri-map-pin-2-line"></i> {city}
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-line"></i> ${' '}
                        {price} / per person
                      </span>
                      <span>
                        <i className="ri-map-pin-time-line"></i>
                        {distance} / km
                      </span>
                      <span>
                        <i className="ri-group-line"></i> {maxGroupSize} people
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>

                  <div className="tour__reviews mt-4">
                    <h4>Reviews ({reviews?.length} reviews)</h4>
                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-4 mb-4 rating__group">
                        <span onClick={() => setTourRating(1)}>
                          1 <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(2)}>
                          2 <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(3)}>
                          3 <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(4)}>
                          4 <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(5)}>
                          5 <i className="ri-star-s-fill"></i>
                        </span>
                      </div>
                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewsMsgRef}
                          placeholder="share your opinion"
                          required
                        />
                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                        >
                          SUbmit
                        </button>
                      </div>
                    </Form>
                    <ListGroup className="user__reviews">
                      {reviews?.map((reivew) => (
                        <div className="review__item">
                          <img src={avatar} alt="" />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{reivew.username}</h5>
                                <p>
                                  {new Date(
                                    reivew.createdAt
                                  ).toLocaleDateString('en-US', options)}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {reivew.rating} <i class="ri-star-s-fill"></i>
                              </span>
                            </div>
                            <h6>{reivew.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Col>
              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  )
}

export default TourDetails
