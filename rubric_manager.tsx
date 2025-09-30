import React, { useState } from 'react';
import { Plus, Save, Trash2, FileText } from 'lucide-react';

const RubricManager = () => {
  const [rubrics, setRubrics] = useState([]);
  const [currentRubric, setCurrentRubric] = useState(createEmptyRubric());

  function createEmptyRubric() {
    return {
      id: Date.now(),
      studentName: '',
      grade: '',
      date: new Date().toISOString().split('T')[0],
      criteria: [
        {
          name: 'Word Formatting Skills',
          excellent: 'Effectively uses various formatting features such as titles, headings, fonts, paragraph alignment, bullet/numbered lists',
          satisfactory: 'Uses only basic formatting (titles, paragraphs); readability is maintained',
          needsImprovement: 'Little or no use of formatting; poor readability',
          maxPoints: 25,
          score: ''
        },
        {
          name: 'Tables and Images',
          excellent: 'Appropriately inserts/edits tables and images to clearly present comparisons',
          satisfactory: 'Some use of tables/images; moderately effective',
          needsImprovement: 'Rarely uses tables/images, or placement is awkward',
          maxPoints: 20,
          score: ''
        },
        {
          name: 'Comparison & Analysis',
          excellent: 'Provides clear and specific comparisons of past and present daily life with detailed examples',
          satisfactory: 'Some comparison but lacks detailed examples',
          needsImprovement: 'Mostly listing, little or no comparison/analysis',
          maxPoints: 20,
          score: ''
        },
        {
          name: 'Organization & Logic',
          excellent: 'Clear structure (introduction–body–conclusion); ideas flow logically',
          satisfactory: 'Structure is present but somewhat repetitive or awkward',
          needsImprovement: 'Unclear structure; ideas not logically developed',
          maxPoints: 15,
          score: ''
        },
        {
          name: 'Teamwork & Collaboration',
          excellent: 'Both members actively participate in writing and editing in Word',
          satisfactory: 'One member contributes more than the other',
          needsImprovement: 'Relies heavily on one member; poor collaboration',
          maxPoints: 10,
          score: ''
        },
        {
          name: 'Creativity',
          excellent: 'Original ideas, engaging title, visually appealing layout',
          satisfactory: 'Some originality but mostly conventional',
          needsImprovement: 'Little or no originality',
          maxPoints: 10,
          score: ''
        }
      ]
    };
  }

  const handleScoreChange = (index, value) => {
    const updatedCriteria = [...currentRubric.criteria];
    updatedCriteria[index].score = value;
    setCurrentRubric({ ...currentRubric, criteria: updatedCriteria });
  };

  const handleInfoChange = (field, value) => {
    setCurrentRubric({ ...currentRubric, [field]: value });
  };

  const calculateTotal = () => {
    return currentRubric.criteria.reduce((sum, criterion) => {
      return sum + (parseFloat(criterion.score) || 0);
    }, 0);
  };

  const saveRubric = () => {
    if (!currentRubric.studentName.trim()) {
      alert('학생 이름을 입력해주세요.');
      return;
    }
    
    setRubrics([...rubrics, { ...currentRubric }]);
    setCurrentRubric(createEmptyRubric());
    alert('루브릭이 저장되었습니다!');
  };

  const deleteRubric = (id) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setRubrics(rubrics.filter(r => r.id !== id));
    }
  };

  const loadRubric = (rubric) => {
    setCurrentRubric({ ...rubric, id: Date.now() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">교사용 채점 루브릭</h1>
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentRubric(createEmptyRubric())}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                <Plus size={20} />
                새 양식
              </button>
              <button
                onClick={saveRubric}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                <Save size={20} />
                저장
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">학생 이름</label>
              <input
                type="text"
                value={currentRubric.studentName}
                onChange={(e) => handleInfoChange('studentName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="이름 입력"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">학년</label>
              <input
                type="text"
                value={currentRubric.grade}
                onChange={(e) => handleInfoChange('grade', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="학년 입력"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">날짜</label>
              <input
                type="date"
                value={currentRubric.date}
                onChange={(e) => handleInfoChange('date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="border border-gray-300 p-3 text-left w-48">평가 영역</th>
                  <th className="border border-gray-300 p-3 text-left">우수 (A)</th>
                  <th className="border border-gray-300 p-3 text-left">보통 (B)</th>
                  <th className="border border-gray-300 p-3 text-left">개선 필요 (C)</th>
                  <th className="border border-gray-300 p-3 text-center w-24">배점</th>
                  <th className="border border-gray-300 p-3 text-center w-24">점수</th>
                </tr>
              </thead>
              <tbody>
                {currentRubric.criteria.map((criterion, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold bg-gray-50">
                      {criterion.name}
                    </td>
                    <td className="border border-gray-300 p-3 text-sm">{criterion.excellent}</td>
                    <td className="border border-gray-300 p-3 text-sm">{criterion.satisfactory}</td>
                    <td className="border border-gray-300 p-3 text-sm">{criterion.needsImprovement}</td>
                    <td className="border border-gray-300 p-3 text-center font-semibold">
                      {criterion.maxPoints} pts
                    </td>
                    <td className="border border-gray-300 p-3">
                      <input
                        type="number"
                        min="0"
                        max={criterion.maxPoints}
                        value={criterion.score}
                        onChange={(e) => handleScoreChange(index, e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="점수"
                      />
                    </td>
                  </tr>
                ))}
                <tr className="bg-indigo-100 font-bold">
                  <td colSpan="4" className="border border-gray-300 p-3 text-right">총점</td>
                  <td className="border border-gray-300 p-3 text-center">100 pts</td>
                  <td className="border border-gray-300 p-3 text-center text-lg text-indigo-700">
                    {calculateTotal()} pts
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {rubrics.length > 0 && (
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText size={24} />
              저장된 루브릭 ({rubrics.length})
            </h2>
            <div className="grid gap-4">
              {rubrics.map((rubric) => (
                <div key={rubric.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800">{rubric.studentName}</h3>
                      <div className="text-sm text-gray-600 mt-1">
                        학년: {rubric.grade} | 날짜: {rubric.date} | 총점: {rubric.criteria.reduce((sum, c) => sum + (parseFloat(c.score) || 0), 0)}/100
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => loadRubric(rubric)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      >
                        불러오기
                      </button>
                      <button
                        onClick={() => deleteRubric(rubric.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
                      >
                        <Trash2 size={16} />
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RubricManager;