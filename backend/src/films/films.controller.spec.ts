import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

const mockFilmsResponse = {
  total: 1,
  items: [
    {
      id: 'film-1',
      title: 'Test Film',
      rating: 8.5,
      director: 'Director',
      tags: ['drama'],
      about: 'About text',
      description: 'Description',
      image: 'image.jpg',
      cover: 'cover.jpg',
    },
  ],
};

const mockScheduleResponse = {
  total: 1,
  items: [
    {
      id: 'schedule-1',
      daytime: '2025-01-01T10:00:00.000Z',
      hall: '1',
      rows: 10,
      seats: 15,
      price: 500,
      taken: [],
    },
  ],
};

describe('FilmsController', () => {
  let controller: FilmsController;
  let filmsService: jest.Mocked<FilmsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            findAll: jest.fn(),
            findScheduleByFilmId: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    filmsService = module.get(FilmsService);
  });

  describe('findAll', () => {
    it('should return films response from service', async () => {
      filmsService.findAll.mockResolvedValue(mockFilmsResponse);

      const result = await controller.findAll();

      expect(filmsService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockFilmsResponse);
    });
  });

  describe('findSchedule', () => {
    it('should pass film id to service and return schedule response', async () => {
      filmsService.findScheduleByFilmId.mockResolvedValue(mockScheduleResponse);

      const result = await controller.findSchedule('film-1');

      expect(filmsService.findScheduleByFilmId).toHaveBeenCalledWith('film-1');
      expect(result).toEqual(mockScheduleResponse);
    });
  });
});
