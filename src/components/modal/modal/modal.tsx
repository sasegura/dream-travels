import useDisableScroll from '@/hooks/useDisableScroll';
import { ModalOverlay, ModalContent, ModalConfirmContent } from './style';

interface IModal {
  isOpen: boolean;
  onCancel: () => void;
  children: React.ReactNode;
  isConfirm?: boolean;
}

export const CustomModal = ({
  isOpen,
  onCancel,
  children,
  isConfirm,
}: IModal) => {
  useDisableScroll(isOpen);

  if (!isOpen) return null;

  return (
    <ModalOverlay data-testid={'modal_overLay'} onClick={onCancel}>
      {isConfirm ? (
        <ModalConfirmContent onClick={(e) => e.stopPropagation()}>
          {children}
        </ModalConfirmContent>
      ) : (
        <ModalContent
          data-testid={'modal_content'}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </ModalContent>
      )}
    </ModalOverlay>
  );
};
