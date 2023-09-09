import React, { useRef, useState, useEffect } from "react"
import emailjs from "@emailjs/browser"
import * as styles from "./_Form.module.scss"

const Form = (props) => {

    const [order, setOrder] = useState('')

    useEffect(() => {       
        setOrder(props.order)
    })

    const form = useRef()

    const sendEmail = (e) => {
        e.preventDefault()

    emailjs.sendForm('service_l8cr82m', 'template_waaavkq', form.current, 'user_FAY8OHLTh9HWuUBjXK68o')
        .then((result) => {
            console.log(result.text)
            form.current.reset() //<<<
        }, (error) => {
            console.log(error.text)
        })
    }

  return (
    <form className={styles.form} ref={form} onSubmit={sendEmail}>
        <div className={styles.fields}>
            <label htmlFor="user_name">Name</label>
            <input type="text" name="user_name" id="user_name" placeholder="your name (required)" required />

            <label htmlFor="user_phone">Phone</label>
            <input type="tel" id="user_phone" name="user_phone" placeholder="your phone (required)" required ></input>

            <label htmlFor="user_email">email</label>
            <input type="email" name="user_email" id="user_email" placeholder="your email (required)" required />

            {/* <label htmlFor="order">Your order</label> */}
            <textarea className={styles.order} name="order" defaultValue={order}></textarea>
            
            <label htmlFor="message">Message</label>
            <textarea name="message" placeholder="your message" style={{minHeight: "100px"}}></textarea>
        </div>
        <div className={styles.submit}>
            <input type="submit" value="Send order" />
        </div>

    </form>
    )
}

export default Form