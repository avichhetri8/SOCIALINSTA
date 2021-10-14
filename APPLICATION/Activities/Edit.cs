using AutoMapper;
using DOMAIN;
using MediatR;
using PERSISTANCE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace APPLICATION.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                Activity result = await _context.Activities.FindAsync(request.activity.Id);
                _mapper.Map(request.activity, result);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }


        }

    }
}
