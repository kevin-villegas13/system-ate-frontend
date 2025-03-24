export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface EditModalProps<T> extends ModalProps {
  data: T | null;
}
