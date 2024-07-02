import { toast } from "@/components/ui/use-toast";
import getTranslation from "@/utils/transtationUtil";
import { MAX_FILE_SIZE, FULL_ACCEPTED_TYPES } from "@/constants/imageConstants";

const isValidFileType = (fileType: string) => {
  const acceptedTypes = FULL_ACCEPTED_TYPES;
  return acceptedTypes.includes(fileType);
};

const isValidSize = (fileSize: number) => {
  return fileSize > MAX_FILE_SIZE;
};

export const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  form: any,
  setFileName: React.Dispatch<React.SetStateAction<string>>
) => {
  const file = event.target.files;

  if (!file || file.length === 0) {
    toast({
      description: getTranslation("modalForm.responseMessages.notUploadImage"),
    });
    return;
  }

  if (file.length > 1) {
    toast({
      description: getTranslation("modalForm.responseMessages.onlyOneFile"),
    });
    return;
  }

  const fileData = file[0];
  const fileType = fileData.type;
  
  if (!isValidFileType(fileType)) {
    toast({
      description: getTranslation("modalForm.responseMessages.imageWrongType"),
    });
    return;
  }

  if (isValidSize(fileData.size)) {
    toast({
      description: getTranslation("modalForm.responseMessages.bigFile"),
    });
    return;
  }

  setFileName(fileData.name);
  const reader = new FileReader();
  reader.onload = () => {
    const base64 = reader.result as string;
    form.setValue("imageUri", base64);
  };
  reader.readAsDataURL(fileData);

  toast({
    description: getTranslation("modalForm.responseMessages.uploadImage"),
  });

  form.clearErrors("imageUri");
};
