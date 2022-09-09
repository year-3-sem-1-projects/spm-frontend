import jwt_decode from 'jwt-decode'



const ProgressPanel = () => {
    const decodedToken = jwt_decode(localStorage.getItem('token')).data
    const details = [
        {title: "Post Count" , value: decodedToken.post_count},
        {title: "Question Count" , value: decodedToken.question_count},
        {title:"Answer Count", value: decodedToken.answer_count},
        {title:"Number of circles" , value:0}
    ]
    // {title: "Joined Date" , value: decodedToken.created_at}, 
  return (
    <div className="w-full border-2 border-black">
        <div className=" p-3">
            <h1 className="text-2xl">Details</h1>
        </div>
        <hr></hr>

        <div className="flex flex-col p-3">
            {
                details.map((detail) => (
                    <div className="flex">
                        <div className="flex-[3]">
                            {detail.title}
                        </div>
                        <div className="flex-[2] ml-10">
                            {detail.value}
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default ProgressPanel