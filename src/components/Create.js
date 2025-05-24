

import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import array from "./array";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";

function Create() {
    
    // fetching a value in jsx
    const [name, setname] = useState("");
    const [age, setage] = useState("");

    
    let history = useNavigate();

    const handelSubmit = (e) => {
        e.preventDefault(); // Prevent reload

        const ids = uuid(); // Creating unique id
        let uni = ids.slice(0, 8); // Slicing unique id

        // Fetching a value from usestate and
        // pushing to javascript object
        let a = name,
            b = age;
        if (name == "" || age == "") {
            alert("invalid input");
            return;
        }
        array.push({ id: uni, Name: a, Age: b });

        // Redirecting to home page after creation done
        history("/");
    };

    return (
        <div>
            <Form
                className="d-grid gap-2"
                style={{ margin: "5rem" }}
            >
               
                <Form.Group
                    className="mb-3"
                    controlId="formBasicName"
                >
                    <Form.Control
                        onChange={(e) =>
                            setname(e.target.value)
                        }
                        type="text"
                        placeholder="Enter Name"
                        required
                    />
                </Form.Group>

              
                <Form.Group
                    className="mb-3"
                    controlId="formBasicAge"
                >
                    <Form.Control
                        onChange={(e) =>
                            setage(e.target.value)
                        }
                        type="number"
                        placeholder="Age"
                        required
                    />
                </Form.Group>

                <Button
                    onClick={(e) => handelSubmit(e)}
                    variant="primary"
                    type="submit"
                >
                    Submit
                </Button>

                {/* Redirecting back to home page */}
                <Link className="d-grid gap-2" to="/">
                    <Button variant="info" size="lg">
                        Home
                    </Button>
                </Link>
            </Form>
        </div>
    );
}

export default Create;