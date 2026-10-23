"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function PlayerPage() {
  // Global Mock Application Context State
  const [currentDay, setCurrentDay] = useState(4);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showPastAnswer, setShowPastAnswer] = useState(false);

  // Mock Question Database Payload
  const activeQuestion = {
    text: "ކީރިތި ގުރުއާނުގައި އެންމެ ގިނައިން ބަޔާންކުރައްވާފައިވާ ނަބިއްޔާގެ ނަންފުޅަކީ ކޮބައި؟",
    options: [
      "މޫސާގެފާނު (ޢަލައިހިއްސަލާމް)",
      "އިބްރާހީމްގެފާނު (ޢަލައިހިއްސަލާމް)",
      "މުޙައްމަދުޞައްލަﷲ ޢަލައިހި ވަސައްލަމް",
      "ޢީސާގެފާނު (ޢަލައިހިއްސަލާމް)"
    ]
  };

  const pastDayData = {
    is_published: true,
    target_day: 3,
    correct_text: "މޫސާގެފާނު (ޢަލައިހިއްސަލާމް)"
  };

  const handleConfirmSubmit = () => {
    setHasAnswered(true);
    setShowConfirmation(false);
  };

  return (
    <main className="min-h-screen p-4 sm:p-8 max-w-xl mx-auto flex flex-col justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
        
        {/* Title Header Row */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">O Ramazan Quiz</h1>
          <Link href="/admin" className="text-xs bg-slate-100 text-slate-600 font-bold px-3 py-1.5 rounded-lg border border-slate-200">
            ⚙️ ADMIN
          </Link>
        </div>

        {/* Horizontal Calendar Tracker Day Row */}
        <div className="flex gap-2 justify-center mb-6 border-b border-slate-100 pb-4 overflow-x-auto">
          {[1, 2, 3, 4, 5].map((day) => (
            <div
              key={day}
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold border transition-all ${
                day === currentDay
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-slate-50 text-slate-400 border-slate-200"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* User Identity Session Flag */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-right mb-6 text-sm text-slate-600">
          LOGGED IN AS: <span className="font-bold text-slate-800">ޢަލީ ނާޒިމް</span>
        </div>

        {/* Dynamic Question Block */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-right text-slate-800 leading-relaxed thaana-text">
            - {activeQuestion.text}
          </h2>

          <div className="space-y-3">
            {activeQuestion.options.map((option, idx) => (
              <label
                key={idx}
                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all text-right ${
                  selectedOption === idx
                    ? "border-blue-600 bg-blue-50/40 ring-1 ring-blue-600"
                    : "border-slate-200 hover:bg-slate-50"
                } ${hasAnswered ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                <input
                  type="radio"
                  name="quiz-option"
                  disabled={hasAnswered}
                  checked={selectedOption === idx}
                  onChange={() => setSelectedOption(idx)}
                  className="w-5 h-5 text-blue-600 accent-blue-600"
                />
                <span className="text-lg font-medium text-slate-700 flex-1 thaana-text">
                  {String.fromCharCode(65 + idx)}. {option}
                </span>
              </label>
            ))}
          </div>

          {/* Safe Conditional Submission Block */}
          {!hasAnswered ? (
            <div className="pt-2">
              {!showConfirmation ? (
                <button
                  onClick={() => selectedOption !== null && setShowConfirmation(true)}
                  disabled={selectedOption === null}
                  className={`w-full py-4 rounded-xl text-lg font-bold transition-all ${
                    selectedOption !== null
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  ޖަވާބު ފޮނުވާ (SUBMIT)
                </button>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                  <p className="text-amber-800 font-bold mb-3 text-sm">ޖަވާބު ފޮނުވަން ޔަގީންތަ؟ (SUBMIT YES/NO)</p>
                  <div className="flex gap-3 justify-center">
                    <button onClick={handleConfirmSubmit} className="bg-emerald-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-emerald-700 text-xs">
                      އާނއެކެވެ (YES)
                    </button>
                    <button onClick={() => setShowConfirmation(false)} className="bg-slate-200 text-slate-700 font-bold px-6 py-2 rounded-lg hover:bg-slate-300 text-xs">
                      ނޫނެކެވެ (NO)
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-center py-4 rounded-xl font-bold">
              ޖަވާބު ރެކޯޑު ކުރެވިއްޖެ!
            </div>
          )}
        </div>

        {/* Previous Day Answer Reveal Gating Block */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <button
            onClick={() => setShowPastAnswer(!showPastAnswer)}
            className="w-full text-center text-blue-600 hover:text-blue-800 font-bold text-sm"
          >
            SHOW PREVIOUS DAY ANSWER.
          </button>

          {showPastAnswer && (
            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4 text-right">
              {pastDayData.is_published ? (
                <div>
                  <p className="font-semibold text-slate-500 text-xs mb-1">ދުވަސް {pastDayData.target_day} ގެ ރަނގަޅު ޖަވާބު:</p>
                  <p className="text-base font-bold text-emerald-700 thaana-text">{pastDayData.correct_text}</p>
                </div>
              ) : (
                <p className="text-xs text-amber-700 font-bold text-center">ކުރީ ދުވަހުގެ ޖަވާބު އެޑްމިން އަދި ޕަބްލިޝްއެއް ނުކުރޭ!</p>
              )}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
