import React from 'react'
import useScreenSize from '../hooks/Usescreensize';

const Contact = () => {
    const width = useScreenSize();
  return (
    <>
      {width > 768 ? (
        <div className="hero bg-black min-h-screen ">
          <div className="hero-content flex mt-20 text-sm">
            <div className="text-center lg:text-left flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold text-center ">Contact Us</h1>
              <p className="py-6 w-2/3 text-center">
                We're here to help! Whether you have questions, feedback, or
                business inquiries, feel free to reach out. Connect with us
                through the form below, or use the provided contact details to
                get in touch. We’ll respond as soon as possible!
              </p>
            </div>
            <div className="card bg-base-300 w-full max-w-sm shrink-0 shadow-2xl mr-40">
              <div className="card-body">
                <fieldset className="fieldset ">
                  <label className="fieldset-label">Your Email</label>
                  <input type="email" className="input" placeholder="Email" />
                  <label className="fieldset-label">Your Message</label>
                  <input
                    type="text"
                    className="input h-20 "
                    placeholder="Message"
                  />

                  <button className="btn btn-neutral bg-blue-500 mt-4 ">
                    Contact Us
                  </button>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="hero bg-black min-h-screen ">
          <div className="hero-content flex flex-col mt-20 ">
            <div className="text-center lg:text-left flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold text-center ">Contact Us</h1>
              <p className="py-6 w-2/3 text-center text-sm">
                We're here to help! Whether you have questions, feedback, or
                business inquiries, feel free to reach out. Connect with us
                through the form below, or use the provided contact details to
                get in touch. We’ll respond as soon as possible!
              </p>
            </div>
            <div className="card bg-base-300 w-full max-w-sm shrink-0 shadow-2xl ">
              <div className="card-body">
                <fieldset className="fieldset ">
                  <label className="fieldset-label">Your Email</label>
                  <input type="email" className="input" placeholder="Email" />
                  <label className="fieldset-label">Your Message</label>
                  <input
                    type="text"
                    className="input h-20 "
                    placeholder="Message"
                  />

                  <button className="btn btn-neutral bg-blue-500 mt-4 ">
                    Contact Us
                  </button>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Contact