import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'language'
})
export class LanguagePipe implements PipeTransform {

  //eng to kr translation dictionary
  public langMap = 
  { 
    "mon": "월",
    "tue": "화",
    "wed": "수",
    "thu": "목",
    "fri": "금",
    "sat": "토",
    "sun": "일",
    "monday": "월요일",
    "tuesday": "화요일",
    "wednesday": "수요일",
    "thursday": "목요일",
    "friday": "금요일",
    "saturday": "토요일",
    "sunday": "일요일",
    "forecast": "날씨 예보",
    "home": "날씨",
    "cities": "도시",
    "settings": "설정",
    "5 day forecast": "날씨 예보",
    "weather forecast": "날씨 예보",
    "add city weather": "도시 날씨 목록 추가",
    "add weather": "날씨 추가",
    "city": "도시",
    "save changes": "저장",
    "see more": "더보기",
    "language successfully updated!": "언어 변경 완료!",
    "language": "언어",
    "korean": "한국어",
    "english": "영어",
    "pohang": "포항",
    "seoul": "서울",
    "incheon": "인천",
    "london": "런던",
    "new york": "뉴욕",
    "paris": "파리",
    "tokyo": "도쿄",
    "bangkok": "방콕"
  };

  transform(value: string, lang: string): string {
    if(lang === "kr"){
      return this.langMap[value.toLowerCase()];
    }else{
      return value;
    }
  }
}