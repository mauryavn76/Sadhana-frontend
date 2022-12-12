import React, { useState } from 'react';
import Button from '../../multiusable/button';
import { useRouter } from 'next/router';
import { ThreeDots } from 'react-loader-spinner';
import DeleteModal from './delete-modal';
import BASE_URL from '../../../utils/base-url';
import Modal from 'react-bootstrap/Modal';

const SearchDiseaseModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Modal.Header closeButton />
        <div className="px-14 py-4">
          <h1 className="font-bold text-2xl text-center">
            {'Search Diseases'}
          </h1>

          <input type="text" placeholder="Search Disease" />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SearchDiseaseModal;
