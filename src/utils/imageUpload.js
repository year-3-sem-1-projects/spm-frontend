import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import { storage } from '../lib/firebase'

const imageUpload = async (image, path) => {
  if (image == null) return
  const imageRef = ref(storage, `${path}/${image?.name + v4()}`)
  const snapshot = await uploadBytes(imageRef, image)
  const imageURl = await getDownloadURL(snapshot.ref)
  return imageURl
}

export default imageUpload
