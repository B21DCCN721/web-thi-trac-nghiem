const isValidQuestion = (questions) => {
    return questions.every((q) => {
      return (
        q.question.trim() !== "" &&
        q.options.every((opt) => opt.trim() !== "") &&
        q.correctAnswer !== null
      );
    });
}
export default isValidQuestion;