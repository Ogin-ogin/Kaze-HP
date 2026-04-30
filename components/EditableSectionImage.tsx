'use client';

import { useEditMode } from '@/contexts/EditModeContext';
import EditableImageWithUrl from './EditableImageWithUrl';

interface EditableSectionImageProps {
  page: string;
  section: string;
  field: string;
  placeholder: string;
  className?: string;
}

export default function EditableSectionImage({
  page,
  section,
  field,
  placeholder,
  className,
}: EditableSectionImageProps) {
  const { isEditMode } = useEditMode();
  return (
    <EditableImageWithUrl
      page={page}
      section={section}
      field={field}
      placeholderText={placeholder}
      className={className}
      isEditMode={isEditMode}
    />
  );
}
