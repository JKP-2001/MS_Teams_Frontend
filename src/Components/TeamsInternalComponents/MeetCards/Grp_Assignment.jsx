import React from 'react'

const Grp_Assignment = () => {
    return (
        <>
            <div className="cards ml-[150px] w-[70%] min-[946px]:ml-[450px] mb-4">
                <MeetEnded body={"Meeting in General ended: 2m 20s"} />
                <GeneralMessage body={"Dear Students, Quiz 1 will be posted on teams tomorrow morning at 9 AM in the form of teams assignment. You need to upload the scanned copy of your hand written solution on teams. The submission will be open for 1 hour (till 10 AM). Late submissions will attract penalty of marks. It will be a closed book exam. The syllabus is till fluid statics. You need to be online on the teams during the quiz since attendance will be taken. You may be asked to switch on your camera."} />
                <MeetEnded body={"General ended: 16m 34s"} />
                <MeetingCard />
                <MeetEnded body={"Meeting in General ended: 2m 20s"} />
                <MeetEnded body={"Meeting Ended"} />
                <AssignmentCard />
                <MeetingCard />
                <AssignmentCard />
                <GeneralMessage body={"Dear Students, Quiz 1 will be posted on teams tomorrow morning at 9 AM in the form of teams assignment. You need to upload the scanned copy of your hand written solution on teams. The submission will be open for 1 hour (till 10 AM). Late submissions will attract penalty of marks. It will be a closed book exam. The syllabus is till fluid statics. You need to be online on the teams during the quiz since attendance will be taken. You may be asked to switch on your camera."} />
                <MeetEnded body={"Meeting in General ended: 2m 20s"} />
                <MeetingCard />
                <GeneralMessage body={"Dear Students,The mid-semester exam of ME214 (Fluid Mechanics I) will be held on 23 Sept (Tomorrow) 2021 from 9 AM to 11 AM.Please refer to the academic section guidelines for the exam https://google.com The exam will be held in the form of an MS Teams assignment where you need to submit your handwritten solution (As it was done for quiz 1).Both sections A and B are divided into 3 groups each for conducting a total of 6 (3+3) parallel sessions for conducting the exam. You can find your group in the excel sheet. Each session will be proctored and you need to keep your camera ON during the examination period. Your face should be visible in the live camera feed for the complete duration of the exam.Note that it will be a closed book exam."} />
                <AssignmentCard />
                <MeetingCard />
                <MeetingCard />
                <AssignmentCard />
                <FileInMeetCard />
            </div>
            <GoToBottom />
            </>
        )
}

export default Grp_Assignment