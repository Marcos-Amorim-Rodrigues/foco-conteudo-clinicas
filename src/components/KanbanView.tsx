
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, RefreshCw, Calendar, Grid3X3, Tag, Target, Clock, Video, Camera, FileText } from 'lucide-react';

export const KanbanView = ({ calendarData, onDownload, onRegenerate, onViewModeChange }) => {
  // Group calendar data by weeks
  const weekGroups = calendarData.reduce((acc, post) => {
    const weekKey = `Semana ${post.week}`;
    if (!acc[weekKey]) {
      acc[weekKey] = [];
    }
    acc[weekKey].push(post);
    return acc;
  }, {});

  const getObjectiveColor = (objetivo) => {
    switch (objetivo) {
      case 'Educar':
      case 'Educar e conscientizar':
      case 'Educar e engajar':
      case 'Educar e tranquilizar':
      case 'Esclarecer e atrair':
      case 'Educar e qualificar leads':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Atrair pacientes':
      case 'Converter e atrair':
      case 'Educar e atrair pacientes':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Engajar':
      case 'Engajar e conhecer público':
      case 'Ajudar e fidelizar':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Gerar confiança':
      case 'Demonstrar autoridade':
      case 'Educar e posicionar autoridade':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (tipo) => {
    if (tipo.includes('Vídeo')) return <Video className="h-4 w-4" />;
    if (tipo.includes('Carrossel')) return <Grid3X3 className="h-4 w-4" />;
    if (tipo.includes('Post')) return <FileText className="h-4 w-4" />;
    return <Camera className="h-4 w-4" />;
  };

  const getWeekStats = (posts) => {
    const objectives = posts.reduce((acc, post) => {
      const obj = post.objetivo.split(' ')[0]; // Get first word
      acc[obj] = (acc[obj] || 0) + 1;
      return acc;
    }, {});
    return objectives;
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
                <span>Calendário por Semanas</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={() => onViewModeChange('grid')}
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <Grid3X3 className="h-4 w-4 mr-2" />
                Visão Grade
              </Button>
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

      {/* Kanban Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Seu calendário estratégico de 30 dias
          </h1>
          <p className="text-gray-600">
            Conteúdo personalizado organizado por semanas, baseado nos procedimentos da sua clínica.
          </p>
        </div>

        {/* Kanban Board */}
        <div className="flex gap-6 overflow-x-auto pb-6">
          {Object.entries(weekGroups).map(([weekName, posts]) => {
            const weekStats = getWeekStats(posts);
            
            return (
              <div key={weekName} className="flex-shrink-0 w-80">
                {/* Week Header */}
                <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                  <h3 className="text-lg font-semibold text-black mb-2">{weekName}</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(weekStats).map(([objective, count]) => (
                      <span key={objective} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {objective}: {count}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {posts.length} posts
                  </div>
                </div>

                {/* Week Posts */}
                <div className="space-y-3">
                  {posts.map((post) => (
                    <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300 border-gray-200 bg-white">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                              {post.dia}
                            </div>
                            {post.isWeekend && (
                              <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                                FDS
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            {getTypeIcon(post.tipo)}
                          </div>
                        </div>
                        <CardTitle className="text-sm text-black leading-tight line-clamp-2">
                          {post.titulo}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-gray-600 text-xs mb-3 line-clamp-3">
                          {post.descricao}
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{post.tipo}</span>
                          </div>
                          
                          <div className={`text-xs font-medium px-2 py-1 rounded border ${getObjectiveColor(post.objetivo)} w-fit`}>
                            {post.objetivo}
                          </div>
                          
                          <div className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded w-fit">
                            {post.procedimento}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 bg-white p-6 rounded-2xl border border-gray-200">
          <h3 className="text-xl font-semibold text-black mb-4">
            Resumo do seu calendário estratégico
          </h3>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {calendarData.filter(post => post.objetivo.includes('Educar')).length}
              </div>
              <div className="text-sm text-green-700">Posts Educativos</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {calendarData.filter(post => post.objetivo.includes('Atrair')).length}
              </div>
              <div className="text-sm text-blue-700">Posts Atrativos</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {calendarData.filter(post => post.objetivo.includes('Engajar')).length}
              </div>
              <div className="text-sm text-purple-700">Posts de Engajamento</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {calendarData.filter(post => post.objetivo.includes('autoridade') || post.objetivo.includes('confiança')).length}
              </div>
              <div className="text-sm text-orange-700">Posts de Autoridade</div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 text-center bg-white p-8 rounded-2xl border border-gray-200">
          <h3 className="text-xl font-semibold text-black mb-4">
            Pronto para dominar as redes sociais?
          </h3>
          <p className="text-gray-600 mb-6">
            Seu calendário estratégico está pronto! Baixe o arquivo ou gere um novo calendário com diferentes abordagens.
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
              Gerar nova estratégia
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
