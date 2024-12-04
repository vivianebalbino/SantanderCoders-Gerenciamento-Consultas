import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, FormsModule, NavbarComponent],
})
export class DashboardComponent {
  appointments: any[] = [];
  isAdmin = false;
  selectedAppointment: any = null;
  newAppointment = { specialty: '', doctor: '', date: '', time: '', obs: '' };

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.fetchAppointments();
    this.isAdmin = localStorage.getItem('role') === 'ADMIN';
  }

  fetchAppointments() {
    this.appointmentService.getAppointments().subscribe((data: any) => {
      this.appointments = data;
    });
  }

  onCreateAppointment() {
    this.appointmentService.createAppointment(this.newAppointment).subscribe({
      next: (response) => {
        alert('Consulta criada com sucesso!');
        this.fetchAppointments(); // Atualiza a lista de consultas
        this.newAppointment = { specialty: '', doctor: '', date: '', time: '', obs: '' }; // Limpa os campos do formulário
      },
      error: (error) => {
        alert('Erro ao criar a consulta!');
      },
    });
  }

  completeAppointment(id: string) {
    this.appointmentService.completeAppointment(id).subscribe(() => {
      alert('Consulta concluída com sucesso!');
      this.fetchAppointments();
    });
  }

  cancelAppointment(id: string) {
    this.appointmentService.cancelAppointment(id).subscribe(() => {
      alert('Consulta cancelada com sucesso!');
      this.fetchAppointments();
    });
  }

  editAppointment() {
    if (this.selectedAppointment) {
      this.appointmentService.editAppointment(this.selectedAppointment.id, this.selectedAppointment).subscribe(() => {
        alert('Consulta editada com sucesso!');
        this.fetchAppointments();
        this.selectedAppointment = null; // Limpa o formulário
      });
    }
  }

  selectAppointment(appointment: any) {
    this.selectedAppointment = { ...appointment }; // Cria uma cópia do objeto selecionado
  }

  delete(id: string) {
    if (confirm('Tem certeza que deseja excluir esta consulta?')) {
      this.appointmentService.deleteAppointment(id).subscribe(() => {
        alert('Consulta excluída com sucesso!');
        this.fetchAppointments();
      });
    }
  }
}
