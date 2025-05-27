
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, RefreshCw, Calendar, Tag, Target } from 'lucide-react';

export const CalendarView = ({ calendarData, onDownload, onRegenerate }) => {
  const getObjectiveColor = (objective) => {
    switch (objective) {
      case 'Educativo':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Promocional':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Engajamento':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-black">
                Foco <span className="text-blue-600">Marketing</span>
              </div>
              <div className="hidden md:block h-6 w-px bg-gray-300"></div>
              <div className="hidden md:flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Seu calendário de conteúdo</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={onDownload}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Download .xlsx
              </Button>
              <Button
                onClick={onRegenerate}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Gerar novamente
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Calendar Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Seu calendário de 30 dias está pronto!
          </h1>
          <p className="text-gray-600">
            Aqui estão seus posts personalizados. Você pode baixar o arquivo Excel ou gerar um novo calendário.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-800">
                    {calendarData.filter(post => post.objective === 'Educativo').length}
                  </p>
                  <p className="text-green-600">Posts Educativos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Tag className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-800">
                    {calendarData.filter(post => post.objective === 'Promocional').length}
                  </p>
                  <p className="text-blue-600">Posts Promocionais</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-800">
                    {calendarData.filter(post => post.objective === 'Engajamento').length}
                  </p>
                  <p className="text-purple-600">Posts de Engajamento</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {calendarData.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300 border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
                      Dia {post.day}
                    </div>
                  </div>
                  <div className={`text-xs font-medium px-2 py-1 rounded border ${getObjectiveColor(post.objective)}`}>
                    {post.objective}
                  </div>
                </div>
                <CardTitle className="text-lg text-black leading-tight">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {post.description}
                </p>
                <div className="text-xs text-blue-600 font-medium">
                  {post.hashtags}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-12 text-center bg-white p-8 rounded-2xl border border-gray-200">
          <h3 className="text-xl font-semibold text-black mb-4">
            Gostou do seu calendário?
          </h3>
          <p className="text-gray-600 mb-6">
            Baixe o arquivo Excel para usar em suas ferramentas de agendamento ou gere um novo calendário.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={onDownload}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              <Download className="h-5 w-5 mr-2" />
              Baixar calendário
            </Button>
            <Button
              onClick={onRegenerate}
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Criar novo calendário
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
