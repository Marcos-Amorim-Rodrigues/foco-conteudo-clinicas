
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, RefreshCw, Calendar, LayoutGrid, Tag, Target, Video, Camera, FileText, Grid3X3 } from 'lucide-react';

interface Post {
  id: number;
  dia: string;
  week: number;
  day: number;
  titulo: string;
  descricao: string;
  tipo: string;
  objetivo: string;
  procedimento: string;
  isWeekend: boolean;
}

interface CalendarViewProps {
  calendarData: Post[];
  onDownload: () => void;
  onRegenerate: () => void;
  onViewModeChange: (mode: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ calendarData, onDownload, onRegenerate, onViewModeChange }) => {
  const getObjectiveColor = (objetivo: string) => {
    switch (objetivo) {
      case 'Inconsciente':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Consciente do Problema':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Consciente da Solução':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Consciente do Produto':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Totalmente Consciente':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (tipo: string) => {
    if (tipo.includes('Vídeo')) return <Video className="h-4 w-4" />;
    if (tipo.includes('Carrossel')) return <Grid3X3 className="h-4 w-4" />;
    if (tipo.includes('Post')) return <FileText className="h-4 w-4" />;
    return <Camera className="h-4 w-4" />;
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
                <span>Visão Grade do Calendário</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={() => onViewModeChange('kanban')}
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <LayoutGrid className="h-4 w-4 mr-2" />
                Visão Kanban
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

      {/* Calendar Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Seu calendário estratégico está pronto!
          </h1>
          <p className="text-gray-600">
            Conteúdo personalizado e estratégico baseado no funil de consciência do cliente.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-800">
                    {calendarData.filter(post => post.objetivo === 'Inconsciente').length}
                  </p>
                  <p className="text-green-600">Inconsciente</p>
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
                    {calendarData.filter(post => post.objetivo === 'Consciente do Problema').length}
                  </p>
                  <p className="text-blue-600">Problema</p>
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
                    {calendarData.filter(post => post.objetivo === 'Consciente da Solução').length}
                  </p>
                  <p className="text-purple-600">Solução</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-800">
                    {calendarData.filter(post => post.objetivo === 'Consciente do Produto').length}
                  </p>
                  <p className="text-orange-600">Produto</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <Target className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-800">
                    {calendarData.filter(post => post.objetivo === 'Totalmente Consciente').length}
                  </p>
                  <p className="text-red-600">Conversão</p>
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
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
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
                <CardTitle className="text-lg text-black leading-tight">
                  {post.titulo}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {post.descricao}
                </p>
                
                <div className="space-y-2">
                  <div className="text-xs text-gray-500">
                    {post.tipo}
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

        {/* Bottom Actions */}
        <div className="mt-12 text-center bg-white p-8 rounded-2xl border border-gray-200">
          <h3 className="text-xl font-semibold text-black mb-4">
            Pronto para implementar sua estratégia?
          </h3>
          <p className="text-gray-600 mb-6">
            Baixe o arquivo Excel para usar em suas ferramentas de agendamento ou gere uma nova estratégia.
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
              Criar nova estratégia
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
