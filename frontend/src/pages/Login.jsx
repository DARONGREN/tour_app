import React, { useState, useContext } from 'react'
import '../styles/login.css'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'
import { useNavigate } from 'react-router-dom'
import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  })
  const navigate = useNavigate()
  const { dispatch } = useContext(AuthContext)
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    dispatch({ type: 'LOGIN_START' })
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'omit',
        body: JSON.stringify(credentials),
      })
      const result = await res.json()
      if (!res.ok) {
        alert(result.message + 'result')
      }
      console.log(result.data)
      dispatch({ type: 'LOGIN_SUCCESS', payload: result.data })
      navigate('/')
    } catch (err) {
      dispatch({ type: 'LOGIN_FAIL', payload: err.message })
    }
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Emial"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
                <p>
                  Do not have accoutn? <Link to="/register">Create</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
export default Login
