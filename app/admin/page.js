"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [activeDay, setActiveDay] = useState(4);
  const [isAnswerPublished, setIsAnswerPublished] = useState(false);
  const [editingDay, setEditingDay] = useState(5);
  const [fileAttached, setFileAttached] = useState(null);

  // Form Field State Values
  const [editorQuestion, setEditorQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIdx, setCorrectIdx] = useState(0);

  // User Completion Tracker Records
  const trackingData = [
    { name: "USER 1", days: [true, true, true, false, false, false] },
    { name: "USER 2", days: [true, true, false, false, false, false] },
    { name: "USER 3", days: [true, true, true, true, false, false] }
  ];

  const handleTemplateDownload = () => {
    const headers = "Day,Question_Text,Option_A,Option_B,Option_C,Option_D,Correct_Index_0_3\n";
    const sampleRow = "5,ކޮބައި؟,އޮޕްޝަން1,އޮޕްޝަން2,އޮޕްޝަން3,އޮޕްޝަން4,0\n";
    const blob = new Blob(["\uFEFF" + headers + sampleRow], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "quiz_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileAttached(e.target.files[0].name);
    }
  };

  return (
    <main className="min-h-screen p-4 sm:p-8 max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <h1 className="text-xl font-bold text-slate-800">ADMIN PANEL</h1>
        <Link href="/" className="text-sm text-blue-600 font-bold hover:underline">
          ← Back to Quiz
        </Link>
      </div>

      {/* Timeline Orchestration Cluster */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <h2 className="text-base font-bold text-slate-700">TIMELINE MANAGEMENT</h2>
        <div className="flex flex-wrap items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold text-slate-600">Active Day:</label>
            <select 
              value={activeDay} 
              onChange={(e) => { setActiveDay(Number(e.target.value)); setIsAnswerPublished(false); }}
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 font-bold"
            >
              {Array.from({ length: 30 }, (_, i) => (
                <option key={i+1} value={i+1}>Day {i+1}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsAnswerPublished(true)}
            disabled={isAnswerPublished}
            className={`px-4 py-2 rounded-lg font-bold text-sm border transition-all ${
              isAnswerPublished 
                ? "bg-slate-100 text-slate-400 border-slate-200" 
                : "bg-amber-600 text-white border-amber-600 hover:bg-amber-700"
            }`}
          >
            {isAnswerPublished ? "✓ Answer Published to DB" : "Publish Previous Day Answer"}
          </button>
        </div>
      </div>

      {/* Live Statistics Completion Checkgrid */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-slate-700">LIVE STATISTICS</h2>
          <a href="/api/export-scores" className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg">
            Download CSV Report
          </a>
        </div>
        
        <div className="border border-slate-100 rounded-xl overflow-hidden">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500">
                <th className="p-3 text-left">User Profile</th>
                {[1, 2, 3, 4, 5, 6].map(d => (
                  <th key={d} className="p-3 text-center">D{d}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {trackingData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="p-3 font-semibold text-slate-700 text-left">{row.name}</td>
                  {row.days.map((status, dIdx) => (
                    <td key={dIdx} className="p-3 text-center">
                      <span className={`inline-block w-5 h-5 rounded font-bold text-xs leading-5 text-center ${status ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-300"}`}>
                        {status ? "✓" : "-"}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Importer & Data Insertion Panel */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-700">QUESTION ADD / LIFECYCLE MANAGEMENT</h2>
          <p className="text-xs text-slate-400 mt-1">Upload files en masse or use the inline tools below to configure individual rows.</p>
        </div>

        {/* Refined File Handling UI Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex flex-col justify-center space-y-2">
            <label className="text-xs font-bold text-slate-600">1. Structure Alignment</label>
            <button 
              type="button" 
              onClick={handleTemplateDownload}
              className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold py-2.5 px-4 rounded-lg text-center"
            >
              📥 Download CSV Template
            </button>
          </div>

          <div className="flex flex-col justify-center space-y-2">
            <label className="text-xs font-bold text-slate-600">2. Processing Attachment</label>
            <div className="relative border border-dashed border-slate-300 bg-white rounded-lg p-2 text-center hover:bg-slate-50/50 transition-all">
              <input 
                type="file" 
                accept=".csv" 
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <span className="text-xs font-medium text-slate-500 block truncate">
                {fileAttached ? `📁 ${fileAttached}` : "Choose CSV File"}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold text-slate-600">Target Day Selector:</label>
            <select 
              value={editingDay} 
              onChange={(e) => setEditingDay(Number(e.target.value))}
              className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 font-bold text-sm"
            >
              {Array.from({ length: 30 }, (_, i) => (
                <option key={i+1} value={i+1}>Day {i+1} {i+1 < activeDay ? "(Past Log)" : "(Future Configuration)"}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 text-right">Question Text (Dhivehi)</label>
              <input
                type="text"
                value={editorQuestion}
                onChange={(e) => setEditorQuestion(e.target.value)}
                placeholder="ސުވާލު މިތަނަށް ލިޔުއްވާ..."
                className="w-full p-3 rounded-xl border border-slate-200 text-right font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-500 text-right">Options & Correct Index Mapping</label>
              {options.map((val, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <input
                    type="radio"
                    name="correct-index-picker"
                    checked={correctIdx === idx}
                    onChange={() => setCorrectIdx(idx)}
                    className="w-4 h-4 text-blue-600 accent-blue-600"
                  />
                  <span className="text-xs font-bold text-slate-400 w-12">{String.fromCharCode(65 + idx)} {correctIdx === idx && "🎯"}</span>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => {
                      const updated = [...options];
                      updated[idx] = e.target.value;
                      setOptions(updated);
                    }}
                    placeholder={`ޖަވާބު ${String.fromCharCode(65 + idx)}`}
                    className="flex-1 p-2 rounded-lg border border-slate-200 text-right text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl text-sm hover:bg-blue-700 shadow-sm"
            >
                Submit
            </button>
