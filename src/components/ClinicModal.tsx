
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';

export const ClinicModal = ({ isOpen, onClose, onSubmit, isGenerating }) => {
  const [formData, setFormData] = useState({
    clinicName: '',
    instagram: '',
    city: '',
    monthlyRevenue: '',
    procedures: []
  });

  const procedures = [
    'Limpeza e Profilaxia',
    'Restaurações',
    'Clareamento Dental',
    'Ortodontia',
    'Implantes',
    'Endodontia',
    'Periodontia',
    'Cirurgia Oral',
    'Próteses',
    'Odontopediatria'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProcedureChange = (procedure, checked) => {
    setFormData(prev => ({
      ...prev,
      procedures: checked 
        ? [...prev.procedures, procedure]
        : prev.procedures.filter(p => p !== procedure)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = formData.clinicName && formData.instagram && formData.city && 
                     formData.monthlyRevenue && formData.procedures.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">
            Conte-nos sobre sua clínica
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="clinicName" className="text-black font-medium">
              Nome da clínica *
            </Label>
            <Input
              id="clinicName"
              value={formData.clinicName}
              onChange={(e) => handleInputChange('clinicName', e.target.value)}
              placeholder="Ex: Clínica Odontológica Sorriso"
              className="border-gray-300 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram" className="text-black font-medium">
              @ do Instagram *
            </Label>
            <Input
              id="instagram"
              value={formData.instagram}
              onChange={(e) => handleInputChange('instagram', e.target.value)}
              placeholder="@clinicasorriso"
              className="border-gray-300 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-black font-medium">
              Cidade *
            </Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="São Paulo, SP"
              className="border-gray-300 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="revenue" className="text-black font-medium">
              Faturamento médio mensal *
            </Label>
            <Select onValueChange={(value) => handleInputChange('monthlyRevenue', value)}>
              <SelectTrigger className="border-gray-300 focus:border-blue-500">
                <SelectValue placeholder="Selecione uma faixa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="até-10k">Até R$ 10.000</SelectItem>
                <SelectItem value="10k-25k">R$ 10.000 - R$ 25.000</SelectItem>
                <SelectItem value="25k-50k">R$ 25.000 - R$ 50.000</SelectItem>
                <SelectItem value="50k-100k">R$ 50.000 - R$ 100.000</SelectItem>
                <SelectItem value="acima-100k">Acima de R$ 100.000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-black font-medium">
              Principais procedimentos realizados * (selecione pelo menos um)
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {procedures.map((procedure) => (
                <div key={procedure} className="flex items-center space-x-2">
                  <Checkbox
                    id={procedure}
                    checked={formData.procedures.includes(procedure)}
                    onCheckedChange={(checked) => handleProcedureChange(procedure, checked)}
                    className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label
                    htmlFor={procedure}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {procedure}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              disabled={isGenerating}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!isFormValid || isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando calendário...
                </>
              ) : (
                'Gerar calendário'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
