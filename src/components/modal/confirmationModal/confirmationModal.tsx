import React from 'react';
import { ButtonGroup, CancelButton, ConfirmButton, ModalTitle } from './style';
import useDisableScroll from '@/hooks/useDisableScroll';
import { CustomModal } from '../modal/modal';

interface IConfirmationModal {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal = ({
  isOpen,
  onConfirm,
  onCancel,
}: IConfirmationModal) => {
  useDisableScroll(isOpen);

  if (!isOpen) return null;

  return (
    <CustomModal isOpen={isOpen} onCancel={onCancel} isConfirm={true}>
      <ModalTitle>Are you sure you want to delete this trip?</ModalTitle>
      <ButtonGroup>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
        <ConfirmButton onClick={onConfirm}>Delete</ConfirmButton>
      </ButtonGroup>
    </CustomModal>
  );
};
