import react, {useState} from 'react'
import FullPopup from "reactjs-popup"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import './InfoModal.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function InfoModal({latitude, longitude, event_name,time_of_event,event_description,show,onHide}){
    
    
    return(
        <div>
        <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Centered Modal</h4>
            <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
        </Modal>
    </div>

    )

}
