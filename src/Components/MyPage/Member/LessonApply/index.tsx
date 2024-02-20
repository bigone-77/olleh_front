import { useGetUserLessonsQuery } from '../../../../redux/apis/myPageApi';
import Lesson from '../../Lesson';

const LessonApply = () => {
  const { data, isLoading, error } = useGetUserLessonsQuery();

  let content;

  if (isLoading) {
    content = <p>기록 불러오는중입니다...</p>;
  }

  if (error) {
    content = <p>신청 정보가 존재하지 않습니다.</p>;
  }

  if (data) {
    const Lessons = data.result.applicationList;

    content = (
      <>
        {Lessons.map((lesson, index) => (
          <Lesson
            key={index}
            id={lesson.lessonId}
            imgUrl={lesson.imgUrl}
            category={lesson.categoryName}
            status={lesson.applicationStatus}
            createdAt={lesson.createdAt}
            title={lesson.title}
            place={lesson.place}
            startDate={lesson.lessonStartDate}
            startTime={lesson.lessonStartTime}
            endTime={lesson.lessonEndTime}
            teacher={lesson.lessonTeacherList[0].name}
            hoverMessage="신청 취소하기"
          />
        ))}
      </>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center gap-10 px-32 py-10">
      {content}
    </div>
  );
};

export default LessonApply;
