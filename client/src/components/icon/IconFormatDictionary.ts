import { PdfIcon, FolderIcon, DefaultFileIcon, DocIcon, CsvIcon } from '@assets/formatIcons';

const dictionaryFormat = {
  dir: FolderIcon,
  file: DefaultFileIcon,
  pdf: PdfIcon,
  doc: DocIcon,
  csv: CsvIcon,
};

type IconFormatTypes = keyof typeof dictionaryFormat;

export { dictionaryFormat };
export type { IconFormatTypes };
