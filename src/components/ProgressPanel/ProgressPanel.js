import jwt_decode from 'jwt-decode'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Typography } from '@mui/material'

const ProgressPanel = () => {
  const decodedToken = jwt_decode(localStorage.getItem('token')).data
  const details = [
    { title: 'Post Count', value: decodedToken.post_count },
    { title: 'Question Count', value: decodedToken.question_count },
    { title: 'Answer Count', value: decodedToken.answer_count },
    { title: 'Number of circles', value: 0 },
  ]
  // {title: "Joined Date" , value: decodedToken.created_at},
  return (
    <Card sx={{ width: '300px' }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ paddingBottom: '10px' }}>
          Details
        </Typography>
        <div>
          {details.map(detail => (
            <Typography variant="body2" sx={{ paddingBottom: '5px' }}>
              {detail.title} - {detail.value}
            </Typography>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProgressPanel
