export interface LessonList {
  lessonId: number;
  title: string;
  gatherStartDate: string;
  gatherEndDate: string;
  lessonStartDate: string;
  lessonEndDate: string;
  lessonStartTime: string;
  lessonEndTime: string;
  place: string;
  imageUrl: string;
  description: string;
  price: number;
}

export interface CategoryLessonsResponse {
  code: string;
  message: string;
  result: {
    lessonPreviewDTOList: LessonList[];
    listSize: number;
    totalPage: number;
    totalElements: number;
    isFirst: boolean;
    isLast: boolean;
  };
}
