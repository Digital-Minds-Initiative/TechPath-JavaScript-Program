function gradeFor(score) {
  if (score >= 90) {
    return "ممتاز";
  } else if (score >= 70) {
    return "جيد";
  }
  return "يحتاج مراجعة";
}

function displayName(nickname) {
  return nickname || "زائر";
}

function starsOrZero(stars) {
  return stars ?? 0;
}
