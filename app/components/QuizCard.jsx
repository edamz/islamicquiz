"use client";
import React, { useState } from "react";

export default function QuizCard({ currentDay, totalDays = 30, questionData, previousDayData, onAnswerSubmit }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showPastAnswer, setShowPastAnswer] = useState(false);

  const handleTriggerSubmit = (e) => {
    e.preventDefault();
    if (selectedOption !== null) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmSubmit = () => {
    setHasSubmitted(true);
    setShowConfirmation(false);
    onAnswerSubmit({ day: currentDay, selection: selectedOption });
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
      {/* 1. TOP HEADER & THEME TITLE (From Sketch 1) */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Ramazan Quiz</h1>
        <span className="bg-blue-50 text-blue-700 text-sm font-bold px-3 py-1 rounded-full">
          ދުވަސް {currentDay}
        </span>
      </div>

      {/* 2. HORIZONTAL DAY TRACKER (From Sketch 1) */}
      <div className="flex gap-2 justify-center mb-8 border-b border-slate-100 pb-4 overflow-x-auto">
        {Array.from({ length: 5 }, (_, i) => i + 1).map((dayNum) => (
          <div
            key={dayNum}
            className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm border transition-all ${
              dayNum === currentDay
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-slate-50 text-slate-400 border-slate-200"
            }`}
          >
            {dayNum}
          </div>
        ))}
      </div>

      {/* USER BANNER DISPLAY */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-2 text-right mb-6 text-sm text-slate-600">
        Logged in as: <span className="font-semibold text-slate-800">ޢަލީ އިޙްސާން</span>
      </div>

      {/* 3. DYNAMIC DHIVEHI QUESTION AREA */}
      {questionData ? (
        <form onSubmit={handleTriggerSubmit} className="space-y-4">
          <h2 className="text-xl font-bold text-right text-slate-800 leading-relaxed mb-6 thaana-text">
            {questionData.question_text}
          </h2>

          {questionData.options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all text-right ${
                selectedOption === index
                  ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600"
                  : "border-slate-200 hover:bg-slate-50"
              } ${hasSubmitted ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              <input
                type="radio"
                name="quiz-option"
                disabled={hasSubmitted}
                checked={selectedOption === index}
                onChange={() => setSelectedOption(index)}
                className="w-5 h-5 text-blue-600 border-slate-300 focus:ring-blue-500 accent-blue-600"
              />
              <span className="text-lg font-medium text-slate-700 flex-1 thaana-text">{option}</span>
            </label>
          ))}

          {/* SUBMIT CONFIRMATION INTERFACE ACTION ROW */}
          {!hasSubmitted ? (
            <div className="pt-4">
              {!showConfirmation ? (
                <button
                  type="submit"
                  disabled={selectedOption === null}
                  className={`w-full py-4 rounded-xl text-lg font-bold transition-all ${
                    selectedOption !== null
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  ޖަވާބު ފޮނުވާ
                </button>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center animate-fade-in">
                  <p className="text-amber-800 font-semibold mb-3">ޖަވާބު ޔަގީންތަ؟ (Submit Yes/No)</p>
                  <div className="flex gap-3 justify-center">
                    <button
                      type="button"
                      onClick={handleConfirmSubmit}
                      className="bg-emerald-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-emerald-700 text-sm"
                    >
                      އާނއެކެވެ
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowConfirmation(false)}
                      className="bg-slate-200 text-slate-700 font-bold px-6 py-2 rounded-lg hover:bg-slate-300 text-sm"
                    >
                      ނޫނެކެވެ
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-center py-4 rounded-xl font-bold mt-4">
              ޖަވާބު ރެކޯޑު ކުރެވިއްޖެ!
            </div>
          )}
        </form>
      ) : (
        <div className="text-center py-8 text-slate-400">މިއަދުގެ ސުވާލު އަދި އަޕްލޯޑެއް ނުކުރޭ.</div>
      )}

      {/* 4. SHOW PREVIOUS DAY ANSWER ENFORCEMENT ACTION (From Sketch 1) */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setShowPastAnswer(!showPastAnswer)}
          className="w-full text-center text-blue-600 hover:text-blue-800 font-bold text-sm flex items-center justify-center gap-1"
        >
          {showPastAnswer ? "ކުރީގެ ޖަވާބު ފޮރުވާ" : "Show Previous Day Answer"}
        </button>

        {showPastAnswer && (
          <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4 text-right animate-slide-down">
            {previousDayData && previousDayData.is_published ? (
              <div>
                <p className="font-semibold text-slate-500 text-xs mb-1">ދުވަސް {previousDayData.target_day} ގެ ރަނގަޅު ޖަވާބު:</p>
                <p className="text-lg font-bold text-emerald-700 thaana-text">{previousDayData.correct_answer_text}</p>
              </div>
            ) : (
              <p className="text-sm text-amber-700 font-medium text-center">ކުރީ ދުވަހުގެ ޖަވާބު އެޑްމިން އަދި ޕަބްލިޝްއެއް ނުކުރޭ!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
