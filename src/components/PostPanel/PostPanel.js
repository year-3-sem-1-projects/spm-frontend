import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import CreateIcon from '@mui/icons-material/Create'
import RateReviewTwoToneIcon from '@mui/icons-material/RateReviewTwoTone'
import Card from '@mui/joy/Card'
import { Button } from '@mui/joy'

const PostPanel = () => {
  return (
    <>
      <Card
        elevation={3}
        sx={{
          minWidth: 300,
          minHeight: 5,
          '--Card-radius': theme => theme.vars.radius.xs,
          backgroundColor: '#FFFFFF',
        }}
      >
        <div className="w-full h-full">
          <div className="flex justify-evenly items-center p-5">
            <img
              src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
              alt=""
              className="rounded-full h-10 w-10"
            />

            <input
              className="w-[30rem] h-7 bg-white-400 rounded-md outline-fill p-4"
              placeholder="Ask something..."
            />
          </div>
          <div className="flex justify-center">
            <div className="flex justify-around w-3/5">
              <div className="flex">
                <HelpOutlineIcon />
                <span>Ask</span>
              </div>
              <div className="h-6 w-0.5 bg-black"></div>
              <div className="flex">
                <RateReviewTwoToneIcon />
                <span>Answer</span>
              </div>
              <div className="h-6 w-0.5 bg-black"></div>
              <div className="flex">
                <CreateIcon />
                <span>Post</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <br />
    </>
  )
}

export default PostPanel
