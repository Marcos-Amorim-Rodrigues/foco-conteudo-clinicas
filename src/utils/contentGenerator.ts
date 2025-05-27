
export const generatePersonalizedCalendar = (clinicData) => {
  const { clinicName, procedures, city, monthlyRevenue } = clinicData;
  
  // Define content templates based on procedures
  const procedureTemplates = {
    'Limpeza e Profilaxia': {
      educational: [
        {
          titulo: "O que acontece quando você não faz limpeza há mais de 6 meses",
          descricao: `Grave um vídeo no consultório mostrando, com um modelo de dentes ou imagens, como o tártaro se acumula. Explique de forma visual os problemas que isso pode causar: gengivite, mau hálito e até perda de dentes. Use uma linguagem simples e termine com: "Na ${clinicName}, cuidamos da sua saúde bucal com carinho. Agende sua limpeza!"`,
          tipo: "Vídeo explicativo",
          objetivo: "Educar e conscientizar"
        },
        {
          titulo: "Mitos sobre limpeza dental que você precisa conhecer",
          descricao: `Crie um carrossel desmistificando crenças como "limpeza estraga o esmalte" ou "dói muito". Use um design limpo com ícones de verdadeiro/falso. No final, convide: "Ainda tem dúvidas? Mande um direct que nossa equipe esclarece tudo!"`,
          tipo: "Carrossel educativo",
          objetivo: "Educar e engajar"
        }
      ],
      social: [
        {
          titulo: "Bastidores: como é uma limpeza na prática",
          descricao: `Filme (com autorização) um atendimento real de limpeza, mostrando o ambiente acolhedor da ${clinicName}. Destaque o cuidado da equipe e a tecnologia utilizada. Música suave e cortes dinâmicos. Final: "Você merece esse cuidado especial."`,
          tipo: "Vídeo de bastidores",
          objetivo: "Gerar confiança"
        }
      ]
    },
    'Clareamento Dental': {
      educational: [
        {
          titulo: "Clareamento caseiro vs. profissional: qual a diferença real?",
          descricao: `Monte um vídeo comparativo mostrando produtos caseiros (bicarbonato, fitas) vs. tratamento profissional. Explique os riscos dos métodos caseiros e os benefícios do clareamento supervisionado. Use um tom de especialista mas acessível. CTA: "Quer um sorriso seguro e duradouro? Converse conosco!"`,
          tipo: "Vídeo comparativo",
          objetivo: "Educar e posicionar autoridade"
        },
        {
          titulo: "5 alimentos que mancham seus dentes (e você nem imagina)",
          descricao: `Carrossel revelando alimentos surpreendentes que causam manchas: molho de tomate, beterraba, açaí. Para cada alimento, dê uma dica de como consumir sem prejudicar os dentes. Final: "Já pensou em fazer um clareamento profissional? Agende uma avaliação!"`,
          tipo: "Carrossel informativo",
          objetivo: "Educar e atrair pacientes"
        }
      ],
      promotional: [
        {
          titulo: "Transformação real: clareamento em ${clinicName}",
          descricao: `Post com antes e depois de um paciente (com autorização). Conte brevemente a história e destaque o resultado natural. Use depoimento em texto ou áudio. Inclua informações sobre o procedimento e condições especiais do mês.`,
          tipo: "Prova social",
          objetivo: "Converter e atrair"
        }
      ]
    },
    'Implantes': {
      educational: [
        {
          titulo: "Implante dentário: desmistificando o procedimento",
          descricao: `Grave no consultório explicando o passo a passo do implante com linguagem simples. Use modelos 3D ou imagens ilustrativas. Aborde medos comuns sobre dor e tempo de cicatrização. Termine com: "Na ${clinicName}, você tem todo o suporte necessário."`,
          tipo: "Vídeo educativo",
          objetivo: "Educar e tranquilizar"
        },
        {
          titulo: "Quanto tempo dura um implante dentário?",
          descricao: `Vídeo curto respondendo essa dúvida frequente. Explique os fatores que influenciam a durabilidade (higiene, qualidade do implante, acompanhamento). Reforce a importância do pós-operatório. CTA: "Tire suas dúvidas numa consulta. Agende já!"`,
          tipo: "Vídeo informativo",
          objetivo: "Esclarecer e atrair"
        }
      ],
      authority: [
        {
          titulo: "Tecnologia de ponta em implantodontia",
          descricao: `Mostre os equipamentos modernos da ${clinicName} para implantes. Explique como a tecnologia torna o procedimento mais preciso e confortável. Use imagens do consultório e equipamentos. Destaque diferenciais técnicos de forma acessível.`,
          tipo: "Vídeo institucional",
          objetivo: "Demonstrar autoridade"
        }
      ]
    },
    'Ortodontia': {
      educational: [
        {
          titulo: "Aparelho transparente vs. metal: prós e contras",
          descricao: `Vídeo comparativo mostrando os diferentes tipos de aparelho. Explique indicações, tempo de tratamento, cuidados e custos de forma honesta. Use modelos ou casos reais. Final: "Cada caso é único. Venha fazer sua avaliação ortodôntica!"`,
          tipo: "Vídeo comparativo",
          objetivo: "Educar e qualificar leads"
        },
        {
          titulo: "Meu aparelho quebrou! E agora?",
          descricao: `Carrossel com dicas práticas para emergências ortodônticas: bracket solto, fio machucando, elástico que saiu. Dê orientações de primeiros socorros e reforce quando procurar o ortodontista. CTA: "Emergência ortodôntica? Entre em contato!"`,
          tipo: "Carrossel de dicas",
          objetivo: "Ajudar e fidelizar"
        }
      ],
      engagement: [
        {
          titulo: "Enquete: qual seu maior medo do aparelho?",
          descricao: `Post interativo com enquete sobre medos comuns: dor, estética, tempo de tratamento, custo. Use as respostas para criar conteúdos futuros. Comente nas respostas dando dicas e tranquilizando. Engajamento garantido!`,
          tipo: "Post interativo",
          objetivo: "Engajar e conhecer público"
        }
      ]
    },
    'Endodontia': {
      educational: [
        {
          titulo: "Canal: por que esse procedimento salva seu dente",
          descricao: `Vídeo explicativo sobre quando é necessário fazer canal, como funciona o procedimento e por que é a melhor opção para salvar o dente. Use analogias simples e desmistifique a dor. Tom acolhedor e profissional.`,
          tipo: "Vídeo educativo",
          objetivo: "Educar e tranquilizar"
        }
      ]
    }
  };

  // Content distribution strategy
  const contentTypes = ['educational', 'social', 'promotional', 'authority', 'engagement'];
  const weekendTypes = ['engagement', 'social', 'authority'];
  
  // Generate 30 days of content
  const calendar = [];
  let dayCount = 0;
  
  for (let week = 1; week <= 5; week++) {
    for (let day = 1; day <= 7 && dayCount < 30; day++) {
      dayCount++;
      const date = `${String(dayCount).padStart(2, '0')}/06`;
      const isWeekend = day === 6 || day === 7;
      
      // Select appropriate content type for the day
      const availableTypes = isWeekend ? weekendTypes : contentTypes;
      const contentType = availableTypes[Math.floor(Math.random() * availableTypes.length)];
      
      // Select a random procedure that the clinic offers
      const selectedProcedure = procedures[Math.floor(Math.random() * procedures.length)];
      
      // Get content template for the selected procedure and type
      const procedureContent = procedureTemplates[selectedProcedure];
      let content;
      
      if (procedureContent && procedureContent[contentType]) {
        const templates = procedureContent[contentType];
        content = templates[Math.floor(Math.random() * templates.length)];
      } else {
        // Fallback to general educational content
        content = generateFallbackContent(selectedProcedure, contentType, clinicName, city);
      }
      
      calendar.push({
        id: dayCount,
        dia: date,
        week: week,
        day: day,
        titulo: content.titulo,
        descricao: content.descricao,
        tipo: content.tipo,
        objetivo: content.objetivo,
        procedimento: selectedProcedure,
        isWeekend: isWeekend
      });
    }
  }
  
  return calendar;
};

const generateFallbackContent = (procedure, contentType, clinicName, city) => {
  const fallbackTemplates = {
    educational: {
      titulo: `Tudo sobre ${procedure.toLowerCase()} que você precisa saber`,
      descricao: `Vídeo educativo explicando os benefícios e processo do procedimento de ${procedure.toLowerCase()}. Use linguagem simples e mostre como a ${clinicName} realiza este tratamento com excelência. Termine convidando para uma consulta de avaliação.`,
      tipo: "Vídeo educativo",
      objetivo: "Educar"
    },
    social: {
      titulo: `Bastidores: atendimento de ${procedure.toLowerCase()} na ${clinicName}`,
      descricao: `Mostre o ambiente acolhedor da clínica durante um atendimento de ${procedure.toLowerCase()}. Destaque o cuidado da equipe e a satisfação do paciente. Use música suave e cortes que transmitam confiança.`,
      tipo: "Vídeo de bastidores",
      objetivo: "Gerar confiança"
    },
    promotional: {
      titulo: `${procedure} com qualidade em ${city}`,
      descricao: `Post promocional destacando os diferenciais da ${clinicName} para ${procedure.toLowerCase()}. Inclua informações sobre tecnologia, experiência da equipe e condições especiais. CTA claro para agendamento.`,
      tipo: "Post promocional",
      objetivo: "Atrair pacientes"
    },
    authority: {
      titulo: `Por que escolher a ${clinicName} para ${procedure.toLowerCase()}`,
      descricao: `Conteúdo que reforça a autoridade da clínica no procedimento de ${procedure.toLowerCase()}. Mencione formação da equipe, casos de sucesso, tecnologia utilizada e diferenciais técnicos de forma acessível.`,
      tipo: "Post institucional",
      objetivo: "Demonstrar autoridade"
    },
    engagement: {
      titulo: `Você sabia? Curiosidades sobre ${procedure.toLowerCase()}`,
      descricao: `Post interativo com curiosidades interessantes sobre ${procedure.toLowerCase()}. Use formato pergunta/resposta ou mitos/verdades. Incentive comentários e compartilhamentos. Responda ativamente aos comentários.`,
      tipo: "Post interativo",
      objetivo: "Engajar"
    }
  };
  
  return fallbackTemplates[contentType] || fallbackTemplates.educational;
};
