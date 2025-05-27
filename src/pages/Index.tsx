import React, { useState } from 'react';
import { Calendar, Clock, TrendingUp, Users, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ClinicModal } from '@/components/ClinicModal';
import { CalendarView } from '@/components/CalendarView';
import { KanbanView } from '@/components/KanbanView';
import { useToast } from '@/hooks/use-toast';
import { generatePersonalizedCalendar } from '@/utils/contentGenerator';
import emailjs from 'emailjs-com';

const Index = () => {
  const [showModal, setShowModal] = useState(false);
  const [calendarData, setCalendarData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'grid'
  const { toast } = useToast();

  const sendEmail = (formData) => {
    const templateParams = {
      nome_clinica: formData.clinicName,
      instagram: formData.instagram,
      cidade: formData.city,
      faturamento: formData.monthlyRevenue,
      procedimentos: formData.procedures.join(', '),
    };

    return emailjs.send(
      'service_53u6edm',
      'template_6i8so5r',
      templateParams,
      'AENd6qqqchcIP5Kia'
    ).then((response) => {
      console.log('E-mail enviado com sucesso!', response.status, response.text);
      return response;
    }, (err) => {
      console.error('Erro ao enviar e-mail:', err);
      throw err;
    });
  };

  const handleGenerateCalendar = async (clinicData) => {
    setIsGenerating(true);
    
    try {
      // Send email first
      await sendEmail(clinicData);
      
      // Generate personalized calendar with AI-like logic
      setTimeout(() => {
        const personalizedCalendar = generatePersonalizedCalendar(clinicData);
        setCalendarData(personalizedCalendar);
        setShowModal(false);
        setIsGenerating(false);
        
        toast({
          title: "Calendário gerado com sucesso!",
          description: "Seu calendário de 30 dias está pronto para uso. E-mail enviado com sucesso!",
        });
      }, 3000);
    } catch (error) {
      setIsGenerating(false);
      toast({
        title: "Erro ao processar solicitação",
        description: "Houve um problema ao enviar o e-mail. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleDownload = () => {
    toast({
      title: "Download iniciado",
      description: "Seu calendário está sendo preparado para download.",
    });
  };

  const handleRegenerate = () => {
    setCalendarData(null);
    setShowModal(true);
  };

  if (calendarData) {
    return viewMode === 'kanban' ? (
      <KanbanView 
        calendarData={calendarData}
        onDownload={handleDownload}
        onRegenerate={handleRegenerate}
        onViewModeChange={setViewMode}
      />
    ) : (
      <CalendarView 
        calendarData={calendarData}
        onDownload={handleDownload}
        onRegenerate={handleRegenerate}
        onViewModeChange={setViewMode}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-black">
              Foco <span className="text-blue-600">Marketing</span>
            </div>
            <Button 
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
            >
              Criar meu calendário
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
            Gere um calendário de conteúdo personalizado para sua 
            <span className="text-blue-600"> clínica odontológica</span> em segundos
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Basta responder algumas perguntas e receba 30 dias de posts prontos para seu Instagram.
            Economize tempo e mantenha sua presença digital sempre ativa.
          </p>
          <Button 
            onClick={() => setShowModal(true)}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Criar meu calendário agora
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Por que usar nosso gerador de conteúdo?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">Economize tempo</h3>
              <p className="text-gray-600">
                Gere 30 dias de conteúdo em poucos minutos. Foque no que realmente importa: seus pacientes.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">Tenha consistência nas redes</h3>
              <p className="text-gray-600">
                Mantenha uma presença constante e profissional nas redes sociais da sua clínica.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">Conquiste mais pacientes</h3>
              <p className="text-gray-600">
                Conteúdo relevante e educativo que gera confiança e atrai novos pacientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-black mb-8">
            Dentistas confiam na nossa solução
          </h2>
          <div className="bg-white p-8 rounded-2xl max-w-2xl mx-auto shadow-lg">
            <p className="text-lg text-gray-700 mb-6 italic">
              "Desde que comecei a usar o calendário de conteúdo da Foco Marketing, 
              minha clínica aumentou em 40% o engajamento no Instagram. É prático e profissional."
            </p>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-black">Dr. Maria Silva</p>
                <p className="text-gray-600">Clínica Odontológica Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">
                Foco <span className="text-blue-400">Marketing</span>
              </div>
              <p className="text-gray-400">
                Especialistas em marketing digital para clínicas odontológicas.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Links importantes</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contato</h4>
              <p className="text-gray-400">contato@focomarketing.com.br</p>
              <p className="text-gray-400">(11) 99999-9999</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 Foco Marketing. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <ClinicModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleGenerateCalendar}
        isGenerating={isGenerating}
      />
    </div>
  );
};

export default Index;
