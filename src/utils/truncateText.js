export default function truncate(str, maxlength = 75) {
  return str.length > maxlength ? str.slice(0, maxlength - 1) + '…' : str
}
