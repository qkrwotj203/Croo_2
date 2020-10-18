// 홈
// 글쓴이, 내용, 첨부파일(사진,동영상), 글쓴날짜, 해쉬태그, 댓글, 좋아요, 장비정보, 더보기(버튼),
// 필터(색감, 무드, 설정값 설정), 버튼(홈, 크라우드, 업로드, 좋아요이력, 프로필)

const mongoose = require('mongoose')


const userPost = mongoose.Schema(
    {
        user: {
            type: String,
            required: true
        },
        content: {
            type: String
        },
        file: {
            type: String,
            required: true
        },
        reply: [],
        hashtag: [],
        like: [],
        toolsInfo: {
            type: String
        },
    },
    {
        timestamps: true
    }
)


