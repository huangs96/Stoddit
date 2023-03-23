import React from 'react'

function LiveChatrooms() {

  return (
    <>
      <div className="conversationContainer">
        <div
          className="conversation"
        >
          <img 
              className="conversationImg" 
              src='https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg' 
              alt="" 
            />
            <span 
              className="conversationName" 
            >
              chatroom
            </span>
            <div className="contentContainer">
              <div className="avatarContainer">
              {/* {displayImg} */}
            </div>
            <div className="conversationInfoContainer">
                <h5
                  STYLE="font-size: 10pt; color: gray"
                >
                  S&P 500
                </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LiveChatrooms